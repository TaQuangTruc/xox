import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentService } from './appointment.service';
import { QuickSearchDto } from './dto/quickSearch.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Controller('appointments')
export class StaffController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }

  @Post('search')
  search(@Body() dto: QuickSearchDto) {
    return this.appointmentService.search(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
