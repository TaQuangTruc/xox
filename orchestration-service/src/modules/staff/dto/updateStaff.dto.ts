import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role, Specialty } from 'src/common/enums';

export class UpdateStaffDto {
  @IsOptional()
  @IsString({ message: 'Họ phải là chuỗi' })
  @MaxLength(50, { message: 'Họ không được vượt quá 50 ký tự' })
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi' })
  @MaxLength(50, { message: 'Tên không được vượt quá 50 ký tự' })
  firstName?: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Vai trò phải là Doctor, Nurse, Admin hoặc Technician',
  })
  role?: Role;

  @IsOptional()
  @IsEnum(Specialty, {
    message: 'Chuyên môn phải là Nội, Ngoại, Nhi, Sản, Tim mạch hoặc Khác',
  })
  specialty?: Specialty;

  @IsOptional()
  @IsString({ message: 'Số giấy phép hành nghề phải là chuỗi' })
  @MaxLength(50, {
    message: 'Số giấy phép hành nghề không được vượt quá 50 ký tự',
  })
  licenseNumber?: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại phải hợp lệ ở Việt Nam' })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Ngày tuyển dụng phải có định dạng hợp lệ (YYYY-MM-DD)' },
  )
  hireDate?: string;
}
