import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { IStaffRepository } from './staffs.repository.interface';

@Injectable()
export class StaffRepository implements IStaffRepository {
  constructor(
    @InjectRepository(Staff)
    private readonly repo: Repository<Staff>,
  ) {}

  create(data: Partial<Staff>): Staff {
    return this.repo.create(data);
  }

  async save(staff: Staff): Promise<Staff> {
    return this.repo.save(staff);
  }

  async find(): Promise<Staff[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.repo.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async remove(staff: Staff): Promise<void> {
    await this.repo.remove(staff);
  }
}
