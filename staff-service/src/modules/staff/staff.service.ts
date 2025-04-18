import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffRole, StaffSpecialty, StaffStatus } from 'src/common/enums'; // Enum for roles, specialties, and status
import { Staff } from 'src/database/entities/staff.entity';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UUID } from 'crypto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { FieldSearchDto, QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  private readonly validFields = [
    'firstname',
    'lastname',
    'role',
    'identityNumber',
    'specialty',
    'licenseNumber',
    'phoneNumber',
    'email',
    'hireDate',
    'status',
  ];

  // Tạo nhân viên mới
  async create(createStaffDto: CreateStaffDto) {
    // Kiểm tra xem có nhân viên nào đã tồn tại với số điện thoại hoặc giấy phép hành nghề không
    const existingStaff = await this.staffRepository.findOne({
      where: [
        { phoneNumber: createStaffDto.phoneNumber },
        { licenseNumber: createStaffDto.licenseNumber },
      ],
    });

    if (existingStaff) {
      // Nếu tìm thấy trùng số điện thoại hoặc giấy phép hành nghề
      if (existingStaff.phoneNumber === createStaffDto.phoneNumber) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: [
            {
              field: 'phoneNumber',
              errors: ['Số điện thoại đã được sử dụng'],
            },
          ],
        });
      }
      if (existingStaff.licenseNumber === createStaffDto.licenseNumber) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: [
            {
              field: 'licenseNumber',
              errors: ['Bằng cấp đã được sử dụng'],
            },
          ],
        });
      }
    }

    const staff = this.staffRepository.create(createStaffDto);

    await this.staffRepository.save(staff);

    return {
      message: 'Tạo nhân viên thành công',
      data: staff,
    };
  }

  // Lấy danh sách tất cả nhân viên
  // async findAll(): Promise<Staff[]> {
  //   return this.staffRepository.find();
  // }

  // Tìm kiếm một nhân viên theo ID
  async findOne(id: string) {
    const staff = await this.staffRepository.findOne({
      where: { id },
    });
    if (!staff) {
      throw new BadRequestException({
        message: 'Staff not found',
        errors: [
          {
            field: 'staffId',
            errors: [`Không tồn tại nhân viên với id: ${id}`],
          },
        ],
      });
    }
    return {
      message: 'Lấy thông tin nhân viên thành công',
      data: staff,
    };
  }

  // Cập nhật thông tin nhân viên
  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepository.findOne({
      where: { id },
    });
    if (!staff) {
      throw new BadRequestException({
        message: 'Staff not found',
        errors: [
          {
            field: 'staffId',
            errors: [`Không tồn tại nhân viên với id: ${id}`],
          },
        ],
      });
    }

    // Cập nhật thông tin nhân viên
    Object.assign(staff, updateStaffDto);

    await this.staffRepository.save(staff);

    return {
      message: 'Cập nhật thông tin nhân viên thành công',
      data: staff,
    };
  }

  // Xóa nhân viên
  async remove(id: string) {
    const staff = await this.staffRepository.findOne({
      where: { id },
    });
    if (!staff) {
      throw new BadRequestException({
        message: 'Staff not found',
        errors: [
          {
            field: 'staffId',
            errors: [`Không tồn tại nhân viên với id: ${id}`],
          },
        ],
      });
    }

    await this.staffRepository.remove(staff);

    return {
      message: 'Xóa thông tin nhân viên thành công',
      data: staff,
    };
  }

  async quickSearch(query: QuickSearchDto) {
    const { quickSearch, pagination } = query;
    const { page = 1, limit = 10 } = pagination || {}; // Phân trang mặc định là 1 và 10 nếu không có

    // Kiểm tra các tham số đầu vào
    // if (!quickSearch) {
    //   throw new BadRequestException({
    //     message: 'QuickSearch not defined',
    //     errors: [
    //       {
    //         field: 'quickSearch',
    //         errors: [`QuickSearch không tồn tại`],
    //       },
    //     ],
    //   });
    // }

    // Lọc các search conditions hợp lệ (fieldname, fieldop, fieldvalue không rỗng)
    const validSearchConditions = quickSearch?.filter(
      (search: FieldSearchDto) =>
        search.fieldname && search.fieldvalue && search.fieldop,
    ) || [];

    // Nếu không có điều kiện tìm kiếm hợp lệ thì không thêm bất kỳ điều kiện nào vào query
    const queryBuilder = this.staffRepository.createQueryBuilder('staff');

    // Nếu không có valid search conditions, trả về toàn bộ danh sách mà không có điều kiện
    if (validSearchConditions?.length === 0) {
      queryBuilder.skip((page - 1) * limit).take(limit); // Phân trang
      const result = await queryBuilder.getMany();
      const total = await queryBuilder.getCount();

      return {
        message: 'Lấy danh sách nhân viên thành công',
        data: result,
        meta: {
          pagination: {
            page,
            limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    }

    // Thêm các điều kiện tìm kiếm động chỉ khi có điều kiện hợp lệ
    validSearchConditions.forEach((search: FieldSearchDto) => {
      const { fieldname, fieldop, fieldvalue } = search;

      if (fieldop === 'LIKE') {
        queryBuilder.andWhere(`staff.${fieldname} LIKE :fieldvalue`, {
          fieldvalue: `%${fieldvalue}%`,
        });
      } else if (fieldop === 'EQUAL') {
        queryBuilder.andWhere(`staff.${fieldname} = :fieldvalue`, {
          fieldvalue,
        });
      }
    });

    // Phân trang
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Thực hiện tìm kiếm
    try {
      const result = await queryBuilder.getMany();
      const total = await queryBuilder.getCount(); // Đếm tổng số kết quả

      return {
        message: 'Lấy danh sách nhân viên thành công',
        data: result,
        meta: {
          pagination: {
            page,
            limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error executing search',
        errors: [
          {
            field: 'quickSearch',
            errors: [`Xảy ra lỗi khi quickSearch`],
          },
        ],
      });
    }
  }
}
