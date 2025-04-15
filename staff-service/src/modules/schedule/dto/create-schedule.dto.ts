import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ShiftType } from 'src/common/enums';

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'ID nhân viên không được để trống' })
  @IsString({ message: 'ID nhân viên phải là chuỗi' })
  staffId: string;

  @IsNotEmpty({ message: 'Thời gian bắt đầu không được để trống' })
  @IsDateString(
    {},
    { message: 'Thời gian bắt đầu phải có định dạng hợp lệ (ISO)' },
  )
  startTime: string;

  @IsNotEmpty({ message: 'Thời gian kết thúc không được để trống' })
  @IsDateString(
    {},
    { message: 'Thời gian kết thúc phải có định dạng hợp lệ (ISO)' },
  )
  endTime: string;

  @IsNotEmpty({ message: 'Loại ca không được để trống' })
  @IsEnum(ShiftType, {
    message: 'Loại ca phải là Morning, Afternoon, Evening, Night hoặc Off',
  })
  shiftType: ShiftType;

  @IsOptional()
  @IsString({ message: 'Khoa phải là chuỗi' })
  @MaxLength(50, { message: 'Khoa không được vượt quá 50 ký tự' })
  department?: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  @MaxLength(200, { message: 'Ghi chú không được vượt quá 200 ký tự' })
  note?: string;
}
