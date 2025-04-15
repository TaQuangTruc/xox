import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsEnum, IsDateString } from 'class-validator';
import { Staff } from './staff.entity';
import { ShiftType } from 'src/common/enums';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  staff: Staff;

  @Column({ name: 'start_time', type: 'timestamptz', nullable: false })
  @IsDateString()
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz', nullable: false })
  @IsDateString()
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ShiftType,
    nullable: false,
  })
  @IsEnum(ShiftType)
  shiftType: ShiftType;

  @Column({ name: 'department', nullable: true })
  department?: string;

  @Column({ name: 'note', nullable: true })
  note?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
