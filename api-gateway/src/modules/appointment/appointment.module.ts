import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaffController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointment.repository';

@Module({
  imports: [HttpModule],
  providers: [AppointmentService, AppointmentRepository],
  exports: [AppointmentRepository],
  controllers: [StaffController],
})
export class AppointmentModule {}
