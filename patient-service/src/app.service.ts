import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from 'database/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientStatus } from 'common/enums';
import { PATIENT_REPOSITORY } from 'common/constants';
import { IPatientsRepository } from './repository/patient.repository.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientsRepository,
  ) {}

  async create(createDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createDto);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOneById(id);
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, updateDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, updateDto);
    return this.patientRepository.save(patient);
  }

  async updateStatus(id: string, status: PatientStatus): Promise<Patient> {
    const patient = await this.findOne(id);
    patient.trangThai = status;
    return this.patientRepository.save(patient);
  }
}
