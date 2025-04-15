import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DayOfWeek, ShiftType } from 'src/common/enums';

export class UpdateScheduleDto {
  @IsOptional()
  @IsString({ message: 'ID nhân viên phải là chuỗi' })
  staffId?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Thời gian bắt đầu phải có định dạng hợp lệ (ISO)' },
  )
  startTime?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Thời gian kết thúc phải có định dạng hợp lệ (ISO)' },
  )
  endTime?: string;

  @IsOptional()
  @IsEnum(ShiftType, {
    message: 'Loại ca phải là Morning, Afternoon, Evening, Night hoặc Off',
  })
  shiftType?: ShiftType;

  @IsOptional()
  @IsString({ message: 'Khoa phải là chuỗi' })
  @MaxLength(50, { message: 'Khoa không được vượt quá 50 ký tự' })
  department?: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  @MaxLength(200, { message: 'Ghi chú không được vượt quá 200 ký tự' })
  note?: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  @MaxLength(200, { message: 'Ghi chú không được vượt quá 200 ký tự' })
  dayOfWeek?: DayOfWeek;
}
