import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/database/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/createPatient.dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';
import { ResponseFormatter } from 'src/common/formatters/response.formatter';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>,
  ) {}

  async create(
    createDto: CreatePatientDto,
  ): Promise<ApiResponse<Patient | null>> {
    try {
      const existingUser = await this.repository.findOne({
        where: { phoneNumber: createDto.phoneNumber },
      });
      if (existingUser) {
        return ResponseFormatter.error('Patient not found.');
      }

      const patient = this.repository.create({
        ...createDto,
        dateOfBirth: new Date(createDto.dateOfBirth),
      });

      return ResponseFormatter.success(
        'Patient created successfully.',
        patient,
      );
    } catch (error) {
      return ResponseFormatter.error('Failed to create patient.', [
        error.message,
      ]);
    }
  }

  async findAll(): Promise<ApiResponse<Patient[] | null>> {
    const patients = await this.repository.find();
    return ResponseFormatter.success('Patients found successfully.', patients);
  }

  async findOne(id: string): Promise<ApiResponse<Patient | null>> {
    const patient = await this.repository.findOne({ where: { id } });
    if (!patient) {
      return ResponseFormatter.error('Patient not found.');
    }
    return ResponseFormatter.success('Patient found successfully.', patient);
  }

  async update(
    id: string,
    updateDto: UpdatePatientDto,
  ): Promise<ApiResponse<Patient | null>> {
    const patient = await this.repository.findOne({ where: { id } });

    if (!patient) {
      return ResponseFormatter.error('Patient not found.');
    }

    if (updateDto.phoneNumber) {
      const existingUser = await this.repository.findOne({
        where: { phoneNumber: updateDto.phoneNumber },
      });

      if (existingUser && existingUser.id !== id) {
        return ResponseFormatter.error('Số điện thoại đã tồn tại');
      }
    }

    Object.assign(patient, {
      ...updateDto,
      dateOfBirth: updateDto.dateOfBirth
        ? new Date(updateDto.dateOfBirth)
        : patient.dateOfBirth,
    });

    const updatedPatient: Patient = await this.repository.save(patient);

    return ResponseFormatter.success(
      'Patient updated successfully.',
      updatedPatient,
    );
  }

  async remove(id: string): Promise<ApiResponse<void | null>> {
    const patient = await this.repository.findOne({ where: { id } });

    if (!patient) {
      return ResponseFormatter.error('Patient not found.');
    }

    await this.repository.remove(patient);

    return ResponseFormatter.success('Patient deleted successfully', null);
  }
}
