import {
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  Length,
  Matches,
} from 'class-validator';
import { Gender, StaffSpecialty } from 'src/common/enums';

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

  @IsNotEmpty({ message: 'Examination time is required' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Examination time must be in HH:mm format (24-hour)',
  })
  examinationTime: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Doctor code is required' })
  @IsString({ message: 'Doctor code must be a string' })
  doctorCode: string;

  @IsNotEmpty({ message: 'Doctor name is required' })
  @IsString({ message: 'Doctor name must be a string' })
  doctorName: string;
}
