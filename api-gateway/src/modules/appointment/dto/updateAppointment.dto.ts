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

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid birthday format' })
  birthday: Date;

  @IsOptional()
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 digits' })
  phoneNumber: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender: Gender;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsOptional()
  @IsEnum(StaffSpecialty, { message: 'Invalid staff specialty' })
  staffSpecialty: StaffSpecialty;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid examination date format' })
  examinationDate: Date;

  @IsOptional()
  @IsEnum(Session, { message: 'Invalid examination session' })
  examinationSession: Session;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;
}
