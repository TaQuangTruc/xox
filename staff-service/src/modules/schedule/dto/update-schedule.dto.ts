// update-work-schedule.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { RepeatType } from 'src/common/enums';

export class UpdateWorkScheduleDto {
  @IsOptional()
  // TODO: @IsTime({ message: 'Giờ bắt đầu phải có định dạng hợp lệ (HH:MM:SS)' })
  startTime?: string; // Giờ bắt đầu

  @IsOptional()
  // TODO: @IsTime({ message: 'Giờ kết thúc phải có định dạng hợp lệ (HH:MM:SS)' })
  endTime?: string; // Giờ kết thúc

  @IsOptional()
  @IsNotEmpty({ message: 'Nội dung công việc không được để trống' })
  @MaxLength(500, {
    message: 'Nội dung công việc không được vượt quá 500 ký tự',
  })
  taskDescription?: string; // Nội dung công việc

  @IsOptional()
  @IsEnum(RepeatType, { message: 'Loại lặp lại không hợp lệ' })
  repeatType?: RepeatType; // Loại lặp lại

  @IsOptional()
  @IsNotEmpty({ message: 'Nơi làm việc không được để trống' })
  location?: string; // Nơi làm việc
}
