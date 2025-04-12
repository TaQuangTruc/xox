import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('patient_created')
  handlePatientCreated(patient: any) {
    console.log('Processing patient:', patient);
    // Xử lý logic lưu đơn hàng vào database
  }
}
