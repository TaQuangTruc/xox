/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [PatientModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
