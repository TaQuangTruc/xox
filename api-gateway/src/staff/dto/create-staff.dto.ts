import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsOptional()
  @IsString()
  specialty: string;

  @IsOptional()
  @IsString()
  licenseNumber: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  recruitmentDate: string;
}
