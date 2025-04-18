import { IsEnum, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { FieldOperator } from 'src/common/enums';


export class FieldSearchDto {
  @IsString()
  fieldname: string; // Tên trường cần truy vấn
  
  @IsEnum(FieldOperator)
  fieldop: FieldOperator; // Toán tử (LIKE, EQUAL)
  
  @IsString()
  fieldvalue: string; // Giá trị cần tìm
}

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  page: number = 1; // Trang (mặc định = 1 nếu không có)

  @IsOptional()
  @IsNumber()
  limit: number = 10; // Số lượng kết quả trên 1 trang (mặc định = 10 nếu không có)
}

export class QuickSearchDto {
  @IsArray()
  @IsOptional()
  quickSearch: FieldSearchDto[]; // Mảng các điều kiện tìm kiếm
  
  @IsOptional()
  pagination: PaginationDto; // Phân trang
}
