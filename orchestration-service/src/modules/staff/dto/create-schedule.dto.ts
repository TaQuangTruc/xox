// create-work-schedule.dto.ts

import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
import { RepeatType } from 'src/common/enums';

export class CreateWorkScheduleDto {
  @IsNotEmpty({ message: 'Giờ bắt đầu không được để trống' })
  startTime: string; 

  @IsNotEmpty({ message: 'Giờ kết thúc không được để trống' })
  endTime: string; 

  @IsNotEmpty({ message: 'Ngày lên lịch không được để trống' })
  scheduleDate: string;

  @IsNotEmpty({ message: 'Nội dung công việc không được để trống' })
  @MaxLength(500, {
    message: 'Nội dung công việc không được vượt quá 500 ký tự',
  })
  title: string; 

  @IsEnum(RepeatType, { message: 'Loại lặp lại không hợp lệ' })
  repeatType: RepeatType; 

  @IsNotEmpty({ message: 'Nơi làm việc không được để trống' })
  location: string; 
}
