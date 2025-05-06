import {
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  Length,
  IsOptional,
} from 'class-validator';
import { Gender, StaffSpecialty, Session } from 'src/common/enums';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Birthday is required' })
  @IsDateString({}, { message: 'Invalid birthday format (YYYY-MM-DD)' })
  birthday: Date;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(10, 15, {
    message: 'Phone number must be between 10 and 15 characters',
  })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender: Gender;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Staff specialty is required' })
  @IsEnum(StaffSpecialty, { message: 'Invalid staff specialty' })
  staffSpecialty: StaffSpecialty;

  @IsNotEmpty({ message: 'Examination date is required' })
  @IsDateString({}, { message: 'Invalid examination date format (YYYY-MM-DD)' })
  examinationDate: Date;

  @IsNotEmpty({ message: 'Examination session is required' })
  @IsEnum(Session, { message: 'Invalid examination session' })
  examinationSession: Session;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
