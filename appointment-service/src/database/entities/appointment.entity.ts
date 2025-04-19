import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  Length,
} from 'class-validator';
import { Gender, StaffSpecialty, Session } from 'src/common/enums';

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

  @Column({
    type: 'enum',
    enum: Session,
  })
  @IsEnum(Session, { message: 'Invalid examination session' })
  examinationSession: Session;

  @Column()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
