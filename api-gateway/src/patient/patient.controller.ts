import { Controller, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() order: any) {
    await this.patientService.createPatient(order);
    return { message: 'Patient sent to processing!' };
  }
}