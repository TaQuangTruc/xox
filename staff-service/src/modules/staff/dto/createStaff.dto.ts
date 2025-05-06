import {
  IsString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
  Length,
} from 'class-validator';
import { StaffRole, StaffSpecialty, StaffStatus } from 'src/common/enums';
// import { StaffRole, StaffSpecialty, StaffStatus } from '../'

export class CreateStaffDto {
  @IsString({ message: 'First name is required and should be a string.' })
  @IsNotEmpty({ message: 'First name cannot be empty.' })
  firstname: string;

  @IsString({ message: 'Last name is required and should be a string.' })
  @IsNotEmpty({ message: 'Last name cannot be empty.' })
  lastname: string;

  @IsEnum(StaffRole, {
    message: 'Role must be one of the following: DOCTOR, NURSE, ADMIN.',
  })
  role: StaffRole;

  @IsString({
    message:
      'Identity number (CCCD/CMND/Hộ chiếu) is required and should be a string.',
  })
  @IsNotEmpty({ message: 'Identity number cannot be empty.' })
  identityNumber: string;

  @ValidateIf((o) => o.role === StaffRole.Doctor)
  @IsOptional()
  @IsEnum(StaffSpecialty, {
    message:
      'Specialty must be one of the following: CARDIOLOGIST, DERMATOLOGIST, PEDIATRICIAN.',
  })
  specialty?: StaffSpecialty;

  @IsString({ message: 'License number is required and should be a string.' })
  @IsNotEmpty({ message: 'License number cannot be empty.' })
  licenseNumber: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(10, 15, {
    message: 'Phone number must be between 10 and 15 characters',
  })
  phoneNumber: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsDateString(
    {},
    { message: 'Hire date must be a valid date in the format DD/MM/YYYY.' },
  )
  hireDate: string;
}
