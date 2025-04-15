import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/database/entities/schedule.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Repository, Between, Not } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  // Schedule (Lịch làm việc thực tế)
  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { staffId, startTime, endTime } = createScheduleDto;

    const staff = await this.staffRepository.findOne({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (end <= start) {
      throw new BadRequestException(
        'Thời gian kết thúc phải sau thời gian bắt đầu',
      );
    }

    const conflict = await this.scheduleRepository.findOne({
      where: {
        staff: { id: staffId },
        startTime: Between(start, end),
        endTime: Between(start, end),
      },
    });
    if (conflict) {
      throw new ConflictException(
        'Nhân viên đã có ca làm việc trong khoảng thời gian này',
      );
    }

    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      staff,
      startTime: start,
      endTime: end,
    });
    return this.scheduleRepository.save(schedule);
  }

  async findAllSchedules(): Promise<Schedule[]> {
    return this.scheduleRepository.find({ relations: ['staff'] });
  }

  async findOneSchedule(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['staff'],
    });
    if (!schedule) {
      throw new NotFoundException('Không tìm thấy lịch làm việc');
    }
    return schedule;
  }

  async removeSchedule(id: string): Promise<void> {
    const schedule = await this.findOneSchedule(id);
    await this.scheduleRepository.remove(schedule);
  }
}
