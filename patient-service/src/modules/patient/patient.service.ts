import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/database/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/createPatient.dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';
import { FieldSearchDto, QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>,
  ) {}

  async create(createDto: CreatePatientDto) {
    const existingUser = await this.repository.findOne({
      where: { phoneNumber: createDto.phoneNumber },
    });
    if (existingUser) {
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

    try {
      const patient = this.repository.create({
        ...createDto,
        dateOfBirth: new Date(createDto.dateOfBirth),
      });

      await this.repository.save(patient);
      return {
        message: 'Tạo bệnh nhân thành công',
        data: patient,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Xảy ra lỗi khi tạo bệnh nhân mới',
        errors: [
          {
            field: 'patien',
            errors: error,
          },
        ],
      });
    }
  }

  // async findAll() {
  //   const patients = await this.repository.find();
  //   return patients
  // }

  async findOne(id: string) {
    const patient = await this.repository.findOne({ where: { id } });
    if (!patient) {
      throw new BadRequestException({
        message: 'Patient not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại bệnh nhân với id: ${id}`],
          },
        ],
      });
    }
    return {
      message: 'Lấy thông tin bệnh nhân thành công',
      data: patient,
    };
  }

  async update(id: string, updateDto: UpdatePatientDto) {
    const patient = await this.repository.findOne({ where: { id } });

    if (!patient) {
      throw new BadRequestException({
        message: 'Patient not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại bệnh nhân với id: ${id}`],
          },
        ],
      });
    }

    if (updateDto.phoneNumber) {
      const existingUser = await this.repository.findOne({
        where: { phoneNumber: updateDto.phoneNumber },
      });

      if (existingUser && existingUser.id !== id) {
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
    }

    Object.assign(patient, {
      ...updateDto,
      dateOfBirth: updateDto.dateOfBirth
        ? new Date(updateDto.dateOfBirth)
        : patient.dateOfBirth,
    });

    try {
      await this.repository.save(patient);

      return {
        message: 'Cập nhật thông tin bệnh nhân thành công',
        patient,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Xảy ra lỗi khi cập nhật thông tin bệnh nhân',
        errors: [
          {
            field: 'update',
            errors: [`Xảy ra lỗi khi update`],
          },
        ],
      });
    }

  }

  async remove(id: string) {
    const patient = await this.repository.findOne({ where: { id } });

    if (!patient) {
      throw new BadRequestException({
        message: 'Patient not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại bệnh nhân với id: ${id}`],
          },
        ],
      });
    }

    await this.repository.remove(patient);

    return {
      message: 'Xóa thông tin bệnh nhân thành công',
      data: patient,
    };
  }

  async quickSearch(query: QuickSearchDto) {
    const nameEntity = 'patient'
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
    const validSearchConditions =
      quickSearch?.filter(
        (search: FieldSearchDto) =>
          search.fieldname && search.fieldvalue && search.fieldop,
      ) || [];

    // Nếu không có điều kiện tìm kiếm hợp lệ thì không thêm bất kỳ điều kiện nào vào query
    const queryBuilder = this.repository.createQueryBuilder(nameEntity);

    // Nếu không có valid search conditions, trả về toàn bộ danh sách mà không có điều kiện
    if (validSearchConditions?.length === 0) {
      queryBuilder.skip((page - 1) * limit).take(limit); // Phân trang
      const result = await queryBuilder.getMany();
      const total = await queryBuilder.getCount();

      return {
        message: 'Lấy danh sách bệnh nhân thành công',
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
        queryBuilder.andWhere(`${nameEntity}.${fieldname} LIKE :fieldvalue`, {
          fieldvalue: `%${fieldvalue}%`,
        });
      } else if (fieldop === 'EQUAL') {
        queryBuilder.andWhere(`${nameEntity}.${fieldname} = :fieldvalue`, {
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
      console.log(error);
      throw new BadRequestException({
        message: 'Xảy ra lỗi khi tìm bệnh nhân',
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
