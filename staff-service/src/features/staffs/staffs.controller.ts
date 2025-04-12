import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StaffService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';

@Controller()
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @MessagePattern('staff.create')
  async create(data: CreateStaffDto): Promise<Staff> {
    return this.staffService.create(data);
  }

  @MessagePattern('staff.findAll')
  async findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @MessagePattern('staff.findOne')
  async findOne(data: { id: string }): Promise<Staff> {
    return this.staffService.findOne(data.id);
  }

  @MessagePattern('staff.update')
  async update(data: {
    id: string;
    updateStaffDto: UpdateStaffDto;
  }): Promise<Staff> {
    return this.staffService.update(data.id, data.updateStaffDto);
  }

  @MessagePattern('staff.delete')
  async delete(data: { id: string }): Promise<void> {
    return this.staffService.delete(data.id);
  }
}
