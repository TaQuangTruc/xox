import { Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/createPatient.dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async create(dto: CreatePatientDto){
    return await this.patientRepository.create(dto);
  }

  async findAll() {
    return await this.patientRepository.findAll();
  }

  async findOne(id: string) {
    return await this.patientRepository.findOne(id);
  }

  async update(id: string, dto: UpdatePatientDto) {
    return await this.patientRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.patientRepository.remove(id);
  }
}
