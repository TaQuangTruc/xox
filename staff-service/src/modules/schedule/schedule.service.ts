import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSchedule } from 'src/database/entities/work-schedule.entity';
import { Between, Raw, Repository } from 'typeorm';
import { CreateWorkScheduleDto } from './dto/create-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-schedule.dto';
import { Staff } from 'src/database/entities/staff.entity';
import { QuickSearchWorkScheduleDto } from './dto/quick-search.dto';
import * as dayjs from 'dayjs';


@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectRepository(WorkSchedule)
    private readonly workScheduleRepo: Repository<WorkSchedule>,

    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
  ) {}

  async create(staffId: string, dto: CreateWorkScheduleDto) {
    const staff = await this.staffRepo.findOne({ where: { id: staffId } });

    if (!staff) {
      if (!staff) {
        throw new BadRequestException({
          message: 'Staff not found',
          errors: [
            {
              field: 'staffId',
              errors: [`Không tồn tại nhân viên với id: ${staffId}`],
            },
          ],
        });
      }
    }

    const schedule = this.workScheduleRepo.create({
      ...dto,
      staff,
    });

    await this.workScheduleRepo.save(schedule);

    return {
      message: 'Tạo lịch thành công',
      data: schedule,
    };
  }

  async findAll() {
    const schedules = await this.workScheduleRepo.find({
      relations: ['staff'],
      order: { startTime: 'ASC' },
    });

    return {
      message: 'Lấy tất cả lịch thành công',
      data: schedules,
    };
  }

  async findOne(id: number) {
    const schedule = await this.workScheduleRepo.findOne({
      where: { id },
      relations: ['staff'],
    });

    if (!schedule) {
      throw new BadRequestException({
        message: 'Schedule not found',
        errors: [
          {
            field: 'scheduleId',
            errors: [`Không tồn tại lịch làm việc với id: ${id}`],
          },
        ],
      });
    }

    return {
      message: 'Lấy thông tin lịch làm việc thành công',
      data: schedule,
    };
  }

  async update(id: number, dto: UpdateWorkScheduleDto) {
    const schedule = await this.workScheduleRepo.findOneBy({ id });

    if (!schedule) {
      throw new BadRequestException({
        message: 'Schedule not found',
        errors: [
          {
            field: 'scheduleId',
            errors: [`Không tồn tại lịch làm việc với id: ${id}`],
          },
        ],
      });
    }

    const updated = this.workScheduleRepo.merge(schedule, dto);
    await this.workScheduleRepo.save(updated);

    return {
      message: 'Cập nhật thông tin lịch làm việc thành công',
      data: updated,
    };
  }

  async delete(id: number) {
    const schedule = await this.workScheduleRepo.findOneBy({ id });

    if (!schedule) {
      throw new BadRequestException({
        message: 'Schedule not found',
        errors: [
          {
            field: 'scheduleId',
            errors: [`Không tồn tại lịch làm việc với id: ${id}`],
          },
        ],
      });
    }

    await this.workScheduleRepo.remove(schedule);

    return { message: 'Xóa lịch làm việc thành công', data: schedule };
  }

  async quickSearch(staffId: string, dto: QuickSearchWorkScheduleDto) {
    try {
      const { fromTime, toTime } = dto;

      // TODO: Parse định dạng 'HH:mm DD/MM/YYYY' sang ISO để so sánh
      // const from = dayjs(fromTime, 'HH:mm DD/MM/YYYY', true);
      // const to = dayjs(toTime, 'HH:mm DD/MM/YYYY', true);
    
      // if (!from.isValid() || !to.isValid()) {
      //   throw new BadRequestException('fromTime hoặc toTime không đúng định dạng HH:mm DD/MM/YYYY');
      // }

      const shedules = await this.workScheduleRepo.find({
        where: {
          staffId: staffId,
          // startTime: Raw((alias) => `${alias} >= :from`, { from }),
          // endTime: Raw((alias) => `${alias} <= :to`, { to }),
        },
        // relations: ['staff'],
        order: { startTime: 'ASC' },
      });

      return {
        messgae: 'Lấy danh sách việc làm của nhân viên thành công',
        data: shedules,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
