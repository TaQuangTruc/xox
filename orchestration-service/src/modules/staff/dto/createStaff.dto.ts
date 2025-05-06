import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role, Specialty } from 'src/common/enums';

export class CreateStaffDto {
  @IsNotEmpty({ message: 'Họ không được để trống' })
  @IsString({ message: 'Họ phải là chuỗi' })
  @MaxLength(50, { message: 'Họ không được vượt quá 50 ký tự' })
  lastName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi' })
  @MaxLength(50, { message: 'Tên không được vượt quá 50 ký tự' })
  firstName: string;

  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  @IsEnum(Role, {
    message: 'Vai trò phải là Doctor, Nurse, Admin hoặc Technician',
  })
  role: Role;

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

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại phải hợp lệ ở Việt Nam' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Ngày tuyển dụng không được để trống' })
  @IsDateString(
    {},
    { message: 'Ngày tuyển dụng phải có định dạng hợp lệ (YYYY-MM-DD)' },
  )
  hireDate: string;
}
