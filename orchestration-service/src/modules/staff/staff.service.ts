import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async create(dto: CreateStaffDto){
    return await this.staffRepository.create(dto);
  }

  async findAll() {
    return await this.staffRepository.findAll();
  }

  async findOne(id: string) {
    return await this.staffRepository.findOne(id);
  }

  async update(id: string, dto: UpdateStaffDto) {
    return await this.staffRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.staffRepository.remove(id);
  }
}
