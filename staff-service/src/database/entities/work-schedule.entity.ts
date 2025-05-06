// work-schedule.entity.ts

import { RepeatType } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MaxLength,
  IsDateString,
  Matches,
} from 'class-validator';
import { Staff } from './staff.entity';

@Entity('work_schedules')
export class WorkSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  @IsNotEmpty({ message: 'Giờ bắt đầu không được để trống' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Starttime must be in HH:MM format',
  })
  startTime: string; // Giờ bắt đầu, ví dụ: '08:00:00'

  @Column({ type: 'time' })
  @IsNotEmpty({ message: 'Giờ kết thúc không được để trống' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Endtime must be in HH:MM format',
  })
  endTime: string; // Giờ kết thúc, ví dụ: '09:00'

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Nội dung công việc không được để trống' })
  @MaxLength(500, {
    message: 'Nội dung công việc không được vượt quá 500 ký tự',
  })
  title: string; // Nội dung công việc

  @Column({
    type: 'enum',
    enum: RepeatType,
    default: RepeatType.DAILY,
  })
  @IsEnum(RepeatType, { message: 'Loại lặp lại không hợp lệ' })
  repeatType: RepeatType; // Loại lặp lại (hàng ngày, hàng tuần...)

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Nơi làm việc không được để trống' })
  location: string; // Nơi làm việc

  @Column({ type: 'date', nullable: true }) // Thêm cột scheduleDate
  @IsDateString({}, { message: 'Ngày lịch trình phải có định dạng YYYY-MM-DD' })
  @IsNotEmpty({ message: 'Ngày lịch trình không được để trống' })
  scheduleDate: string;

  @ManyToOne(() => Staff, (staff) => staff.workSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Trường staffId không được bỏ tróng' })
  staffId: string;
}
