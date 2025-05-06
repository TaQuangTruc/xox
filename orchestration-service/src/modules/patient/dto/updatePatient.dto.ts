import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Gender } from 'src/common/enums';

export class UpdatePatientDto {
  @IsOptional()
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  @MaxLength(100, { message: 'Họ và tên không được vượt quá 100 ký tự' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi' })
  @MaxLength(50, { message: 'Tên không được vượt quá 50 ký tự' })
  name?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Ngày sinh phải có định dạng hợp lệ (YYYY-MM-DD)' },
  )
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Giới tính phải là Nam, Nữ hoặc Khác' })
  gender?: Gender;

  @IsOptional()
  @IsPhoneNumber('VN', {
    message: 'Số điện thoại phải là định dạng hợp lệ của Việt Nam',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  @MaxLength(200, { message: 'Địa chỉ không được vượt quá 200 ký tự' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Tên liên hệ khẩn cấp phải là chuỗi' })
  @MaxLength(100, {
    message: 'Tên liên hệ khẩn cấp không được vượt quá 100 ký tự',
  })
  emergencyContactName?: string;

  @IsOptional()
  @IsString({ message: 'Quan hệ với liên hệ khẩn cấp phải là chuỗi' })
  @MaxLength(50, { message: 'Quan hệ không được vượt quá 50 ký tự' })
  emergencyContactRelationship?: string;

  @IsOptional()
  @IsPhoneNumber('VN', {
    message:
      'Số điện thoại liên hệ khẩn cấp phải là định dạng hợp lệ của Việt Nam',
  })
  emergencyContactPhone?: string;
}
