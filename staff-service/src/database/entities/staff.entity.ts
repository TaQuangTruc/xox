import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsPhoneNumber,
  IsEmail,
  IsUUID,
} from 'class-validator';
import { StaffRole, StaffSpecialty, StaffStatus } from 'src/common/enums';
import { WorkSchedule } from './work-schedule.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;

  @Column()
  @IsString({ message: 'First name must be a string.' })
  firstname: string;

  @Column()
  @IsString({ message: 'Last name must be a string.' })
  lastname: string;

  @Column()
  @IsEnum(StaffRole, {
    message: `Role must be one of the following: ${Object.values(StaffRole).join(', ')}.`,
  })
  role: StaffRole;

  @Column()
  @IsString({ message: 'Identity number must be a string.' })
  identityNumber: string; // CCCD/CMND/Hộ chiếu

  @Column({ nullable: true })
  @IsOptional()
  @IsEnum(StaffSpecialty, {
    message: `Specialty must be one of the following: ${Object.values(StaffSpecialty).join(', ')}.`,
  })
  specialty?: StaffSpecialty; // Bắt buộc với Bác sĩ

  @Column()
  @IsString({ message: 'License number must be a string.' })
  licenseNumber: string; // Mã giấy phép hành nghề

  @Column()
  @IsPhoneNumber(undefined, {
    message: 'Phone number must be a valid phone number.',
  })
  phoneNumber: string;

  @Column()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @Column()
  @IsDateString(
    {},
    { message: 'Hire date must be a valid date in the format YYYY-MM-DD.' },
  )
  hireDate: string; // DD/MM/YYYY

  @Column({
    type: 'enum',
    enum: StaffStatus,
    default: StaffStatus.PA,
  })
  @IsEnum(StaffStatus, {
    message: `Status must be one of the following: ${Object.values(StaffStatus).join(', ')}.`,
  })
  status: StaffStatus;

  @OneToMany(() => WorkSchedule, (workSchedule) => workSchedule.staff)
  workSchedules: WorkSchedule[];
}
