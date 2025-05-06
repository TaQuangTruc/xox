import {
  IsString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { StaffRole, StaffSpecialty, StaffStatus } from 'src/common/enums';

export class UpdateStaffDto {
  @IsString({ message: 'First name must be a string.' })
  @IsOptional()
  firstname?: string;

  @IsString({ message: 'Last name must be a string.' })
  @IsOptional()
  lastname?: string;

  @IsEnum(StaffRole, {
    message: 'Role must be one of the following: DOCTOR, NURSE, ADMIN.',
  })
  @IsOptional()
  role?: StaffRole;

  @IsString({
    message: 'Identity number (CCCD/CMND/Hộ chiếu) must be a string.',
  })
  @IsOptional()
  identityNumber?: string;

  @ValidateIf((o) => o.role === StaffRole.Doctor)
  @IsOptional()
  @IsEnum(StaffSpecialty, {
    message:
      'Specialty must be one of the following: CARDIOLOGIST, DERMATOLOGIST, PEDIATRICIAN.',
  })
  specialty?: StaffSpecialty;

  @IsString({ message: 'License number must be a string.' })
  @IsOptional()
  licenseNumber?: string;

  @IsPhoneNumber('VN', {
    message: 'Phone number must be a valid phone number.',
  })
  @IsOptional()
  phoneNumber?: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsOptional()
  email?: string;

  @IsDateString(
    {},
    { message: 'Hire date must be a valid date in the format DD/MM/YYYY.' },
  )
  @IsOptional()
  hireDate?: string;

  @IsEnum(StaffStatus, {
    message:
      'Status must be one of the following: ACTIVE, INACTIVE, SUSPENDED.',
  })
  @IsOptional()
  status?: StaffStatus;
}
