import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPatientsRepository } from './patient.repository.interface';
import { Patient } from 'database/entities/patient.entity';

@Injectable()
export class PatientRepository implements IPatientsRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  create(data: Partial<Patient>): Patient {
    return this.repo.create(data);
  }

  save(Patient: Patient): Promise<Patient> {
    return this.repo.save(Patient);
  }

  find(): Promise<Patient[]> {
    return this.repo.find();
  }

  async findOneById(id: string): Promise<Patient | null> {
    return this.repo.findOne({ where: { id } });
  }

  async remove(Patient: Patient): Promise<void> {
    await this.repo.remove(Patient);
  }
}
