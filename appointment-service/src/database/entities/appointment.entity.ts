import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  Length,
  Matches,
} from 'class-validator';
import { Gender, StaffSpecialty, AppointmentStatus } from 'src/common/enums';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @Column()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Birthday is required' })
  @IsDateString({}, { message: 'Invalid birthday format' })
  birthday: Date;

  @Column()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 digits' })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender: Gender;

  @Column()
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @Column({
    type: 'enum',
    enum: StaffSpecialty,
  })
  @IsEnum(StaffSpecialty, { message: 'Invalid staff specialty' })
  staffSpecialty: StaffSpecialty;

  @Column()
  @IsNotEmpty({ message: 'Examination date is required' })
  @IsDateString({}, { message: 'Invalid examination date format' })
  examinationDate: Date;

  @Column()
  @IsNotEmpty({ message: 'Examination time is required' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Examination time must be in HH:mm format (24-hour)',
  })
  examinationTime: string;

  @Column()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @Column({ nullable: true })
  @IsString({ message: 'Doctor code must be a string' })
  doctorCode?: string;

  @Column({ nullable: true })
  @IsString({ message: 'Doctor name must be a string' })
  doctorName?: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  @IsEnum(AppointmentStatus, { message: 'Invalid appointment status' })
  status: AppointmentStatus;
}
