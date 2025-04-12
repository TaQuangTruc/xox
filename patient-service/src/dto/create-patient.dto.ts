import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  hoTenDem: string;

  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsNotEmpty()
  @IsDateString()
  ngaySinh: Date;

  @IsNotEmpty()
  @IsEnum(['Nam', 'Nữ', 'Khác'])
  gioiTinh: 'Nam' | 'Nữ' | 'Khác';

  @IsNotEmpty()
  @Matches(/^(0|\+84)[0-9]{9,10}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  soDienThoaiChinh: string;

  @IsNotEmpty()
  @IsString()
  diaChiHienTai: string;

  @IsOptional()
  @IsString()
  tenLienHeKhanCap?: string;

  @IsOptional()
  @IsString()
  quanHeLienHeKhanCap?: string;

  @IsOptional()
  @Matches(/^(0|\+84)[0-9]{9,10}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  soDienThoaiLienHeKhanCap?: string;
}
