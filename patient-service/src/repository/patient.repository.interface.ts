import { Patient } from 'database/entities/patient.entity';

export interface IPatientsRepository {
  create(data: Partial<Patient>): Patient;
  save(Patient: Patient): Promise<Patient>;
  find(): Promise<Patient[]>;
  findOneById(id: string): Promise<Patient | null>;
  remove(Patient: Patient): Promise<void>;
}
