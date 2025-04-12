import { Inject, Injectable } from '@nestjs/common';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { IStaffRepository } from './repositories/staffs.repository.interface';

@Injectable()
export class StaffService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private staffRepository: IStaffRepository,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const { recruitmentDate, ...staffData } = createStaffDto;

    const staff = this.staffRepository.create({
      ...staffData,
      recruitmentDate: new Date(recruitmentDate),
    });

    return this.staffRepository.save(staff);
  }

  async findAll(): Promise<Staff[]> {
    return this.staffRepository.find();
  }

  async findOne(id: string): Promise<Staff> {
    return this.staffRepository.findOne(id);
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.findOne(id); // Kiểm tra staff có tồn tại

    if (updateStaffDto.recruitmentDate) {
      staff.recruitmentDate = new Date(updateStaffDto.recruitmentDate);
    }

    Object.assign(staff, {
      lastName: updateStaffDto.lastName ?? staff.lastName,
      firstName: updateStaffDto.firstName ?? staff.firstName,
      role: updateStaffDto.role ?? staff.role,
      specialty: updateStaffDto.specialty ?? staff.specialty,
      licenseNumber: updateStaffDto.licenseNumber ?? staff.licenseNumber,
      phoneNumber: updateStaffDto.phoneNumber ?? staff.phoneNumber,
      email: updateStaffDto.email ?? staff.email,
    });

    return this.staffRepository.save(staff);
  }

  async delete(id: string): Promise<void> {
    const staff = await this.findOne(id); // Kiểm tra staff có tồn tại
    await this.staffRepository.remove(staff);
  }
}
