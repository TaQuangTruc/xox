import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from 'src/database/entities/appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { FieldSearchDto, QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repository: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    try {
      const appointment = this.repository.create(dto);
      await this.repository.save(appointment);

      return {
        message: 'Tạo lịch hẹn thành công',
        data: appointment,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Xảy ra lỗi khi tạo lịch hẹn mới',
        errors: [
          {
            field: 'appointment',
            errors: [error?.message || 'Không xác định'],
          },
        ],
      });
    }
  }

  async findOne(id: string) {
    const appointment = await this.repository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException({
        message: 'Không tìm thấy lịch hẹn',
        errors: [
          { field: 'id', errors: [`Không tồn tại lịch hẹn với id: ${id}`] },
        ],
      });
    }

    return {
      message: 'Lấy thông tin lịch hẹn thành công',
      data: appointment,
    };
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.repository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException({
        message: 'Không tìm thấy lịch hẹn',
        errors: [
          { field: 'id', errors: [`Không tồn tại lịch hẹn với id: ${id}`] },
        ],
      });
    }

    try {
      Object.assign(appointment, dto);
      await this.repository.save(appointment);

      return {
        message: 'Cập nhật thông tin lịch hẹn thành công',
        data: appointment,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Lỗi khi cập nhật lịch hẹn',
        errors: [
          { field: 'update', errors: [error?.message || 'Không xác định'] },
        ],
      });
    }
  }

  async remove(id: string) {
    const appointment = await this.repository.findOne({ where: { id } });

    if (!appointment) {
      throw new BadRequestException({
        message: 'Không tìm thấy lịch hẹn',
        errors: [
          { field: 'id', errors: [`Không tồn tại lịch hẹn với id: ${id}`] },
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
    const entityAlias = 'appointment';
    const { quickSearch, pagination } = query;
    const { page = 1, limit = 10 } = pagination || {};

    const validConditions = (quickSearch ?? []).filter(
      (s: FieldSearchDto) => s.fieldname && s.fieldop && s.fieldvalue,
    );

    const qb = this.repository.createQueryBuilder(entityAlias);

    validConditions.forEach((cond, i) => {
      const param = `value${i}`;
      const field = `${entityAlias}.${cond.fieldname}`;
      const val = cond.fieldvalue.trim().toLowerCase();

      if (cond.fieldop === 'LIKE') {
        qb.andWhere(`LOWER(${field}) LIKE :${param}`, { [param]: `%${val}%` });
      } else if (cond.fieldop === 'EQUAL') {
        qb.andWhere(`LOWER(${field}) = :${param}`, { [param]: val });
      }
    });

    qb.skip((page - 1) * limit).take(limit);

    try {
      const [data, total] = await Promise.all([qb.getMany(), qb.getCount()]);

      return {
        message: 'Lấy danh sách lịch hẹn thành công',
        data,
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
        message: 'Xảy ra lỗi khi tìm lịch hẹn',
        errors: [
          {
            field: 'quickSearch',
            errors: [error?.message || 'Không xác định'],
          },
        ],
      });
    }
  }
}
