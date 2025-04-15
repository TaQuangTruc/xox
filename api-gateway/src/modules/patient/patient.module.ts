import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PatientRepository } from './patient.repository';
import { HttpModule } from '@nestjs/axios';
import { ResponseHandlerService } from 'src/common/utils/response-handler.service';

@Module({
  imports: [HttpModule],
  providers: [ResponseHandlerService, PatientService, PatientRepository],
  controllers: [PatientController],
})
export class PatientModule {}
