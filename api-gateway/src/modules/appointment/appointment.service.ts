import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  create(dto: CreateAppointmentDto) {
    return this.appointmentRepository.create(dto);
  }

  search(quickSearchDto: QuickSearchDto) {
    return this.appointmentRepository.search(quickSearchDto); // Trả trực tiếp Staff[] hoặc null
  }

  findOne(id: string) {
    return this.appointmentRepository.findOne(id);
  }

  update(id: string, dto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, dto);
  }

  remove(id: string) {
    return this.appointmentRepository.remove(id);
  }
}
