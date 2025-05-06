import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentController } from './appointment.controller';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [HttpModule, StaffModule],
  providers: [AppointmentService, AppointmentRepository],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
