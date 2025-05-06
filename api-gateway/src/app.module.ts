import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { PatientModule } from './modules/patient/patient.module';
import { StaffModule } from './modules/staff/staff.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [HttpModule, PatientModule, StaffModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
