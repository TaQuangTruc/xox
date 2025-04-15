import { Controller, Get, Post, Patch, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // Lịch làm việc thực tế
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createScheduleDto: CreateScheduleDto){
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  findAll(){
    return this.scheduleService.findAllSchedules();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.scheduleService.findOneSchedule(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.scheduleService.removeSchedule(id);
  }

  // Lịch làm việc mặc định


}