// create-work-schedule.dto.ts

import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
import { RepeatType } from 'src/common/enums';

export class CreateWorkScheduleDto {
  @IsNotEmpty({ message: 'Giờ bắt đầu không được để trống' })
  // TODO: @IsTime({ message: 'Giờ bắt đầu phải có định dạng hợp lệ (HH:MM:SS)' })
  startTime: string; // Giờ bắt đầu

  @IsNotEmpty({ message: 'Giờ kết thúc không được để trống' })
  //TODO: @IsTime({ message: 'Giờ kết thúc phải có định dạng hợp lệ (HH:MM:SS)' })
  endTime: string; // Giờ kết thúc

  @IsNotEmpty({ message: 'Nội dung công việc không được để trống' })
  @MaxLength(500, {
    message: 'Nội dung công việc không được vượt quá 500 ký tự',
  })
  title: string; // Nội dung công việc

  @IsEnum(RepeatType, { message: 'Loại lặp lại không hợp lệ' })
  repeatType: RepeatType; // Loại lặp lại

  @IsNotEmpty({ message: 'Nơi làm việc không được để trống' })
  location: string; // Nơi làm việc
}
