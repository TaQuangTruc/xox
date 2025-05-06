import { IsNotEmpty, Matches } from 'class-validator';

export class QuickSearchWorkScheduleDto {
  @IsNotEmpty({ message: 'Trường fromTime không được bỏ trống' })
  @Matches(/^([0-1]\d|2[0-3]):[0-5]\d\s(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'fromTime phải có định dạng HH:mm DD/MM/YYYY',
  })
  fromTime: string;

  @IsNotEmpty({ message: 'Trường toTime không được bỏ trống' })
  @Matches(/^([0-1]\d|2[0-3]):[0-5]\d\s(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'toTime phải có định dạng HH:mm DD/MM/YYYY',
  })
  toTime: string;
}
