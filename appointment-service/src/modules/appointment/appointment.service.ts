import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/database/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { FieldSearchDto, QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repository: Repository<Appointment>,
  ) {}

  async create(createDto: CreateAppointmentDto) {
    try {
      const appointment = this.repository.create(createDto);

      await this.repository.save(appointment);
      return {
        message: 'Tạo lịch hẹn thành công',
        data: appointment,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Xảy ra lỗi khi tạo lịch hẹn mới',
        errors: [
          {
            field: 'appointment',
            errors: error,
          },
        ],
      });
    }
  }

  async findOne(id: string) {
    const appointment = await this.repository.findOne({ where: { id } });
    if (!appointment) {
      throw new BadRequestException({
        message: 'Appointment not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại lịch hẹn với id: ${id}`],
          },
        ],
      });
    }
    return {
      message: 'Lấy thông tin lịch hẹn thành công',
      data: appointment,
    };
  }

  async update(id: string, updateDto: UpdateAppointmentDto) {
    const appointment = await this.repository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException({
        message: 'Appointment not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại lịch hẹn với id: ${id}`],
          },
        ],
      });
    }

    Object.assign(appointment, updateDto);

    try {
      await this.repository.save(appointment);

      return {
        message: 'Cập nhật thông tin lịch hẹn thành công',
        appointment,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Xảy ra lỗi khi cập nhật thông tin lịch hẹn',
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
    const appointment = await this.repository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException({
        message: 'Appointment not found',
        errors: [
          {
            field: 'id',
            errors: [`Không tồn tại lịch hẹn với id: ${id}`],
          },
        ],
      });
    }

    await this.repository.remove(appointment);

    return {
      message: 'Xóa thông tin lịch hẹn thành công',
      data: appointment,
    };
  }

  async quickSearch(query: QuickSearchDto) {
    const nameEntity = 'appointment';
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
        message: 'Lấy danh sách lịch hẹn thành công',
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
        message: 'Lấy danh sách lịch hẹn thành công',
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
        message: 'Xảy ra lỗi khi tìm lịch hẹn',
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
