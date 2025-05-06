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

export class CreatePatientDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  @MaxLength(100, { message: 'Họ và tên không được vượt quá 100 ký tự' })
  fullName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi' })
  @MaxLength(50, { message: 'Tên không được vượt quá 50 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @IsDateString(
    {},
    { message: 'Ngày sinh phải có định dạng hợp lệ (YYYY-MM-DD)' },
  )
  dateOfBirth: string;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsEnum(Gender, { message: 'Giới tính phải là Nam, Nữ hoặc Khác' })
  gender: Gender;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', {
    message: 'Số điện thoại phải là định dạng hợp lệ của Việt Nam',
  })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  @MaxLength(200, { message: 'Địa chỉ không được vượt quá 200 ký tự' })
  address: string;

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
