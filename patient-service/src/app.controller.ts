import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller()
export class AppController {
  constructor(private readonly patientService: AppService) {}

  @MessagePattern('patient_created')
  async handlePatientCreated(@Payload() payload: CreatePatientDto) {
    console.log('Creating patient:', payload);
    return await this.patientService.create(payload);
  }

  @MessagePattern('get_all_patients')
  async handleGetAll() {
    return await this.patientService.findAll();
  }

  @MessagePattern('get_patient_by_id')
  async handleGetOne(@Payload() id: string) {
    return await this.patientService.findOne(id);
  }

  @MessagePattern('update_patient')
  async handleUpdate(@Payload() data: { id: string; update: any }) {
    return await this.patientService.update(data.id, data.update);
  }

  // @MessagePattern('delete_patient')
  // async handleDelete(@Payload() id: string) {
  //   return await this.patientService.remove(id);
  // }
}
