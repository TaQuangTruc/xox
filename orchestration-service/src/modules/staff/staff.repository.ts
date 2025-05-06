// src/modules/staff/staff.repository.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { CreateWorkScheduleDto } from './dto/create-schedule.dto';
import { BaseRepository } from 'src/common/base-repository';

@Injectable()
export class StaffRepository extends BaseRepository {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  private readonly baseUrl = 'http://localhost:3002/staffs';

  create(dto: CreateStaffDto) {
    return this.request(
      () => this.httpService.post(this.baseUrl, dto),
      'create',
    );
  }

  findAll() {
    return this.request(
      () => this.httpService.post(`${this.baseUrl}/search`),
      'findAll',
    );
  }

  async findOne(id: string) {
    try {
      return await this.request(
        () => this.httpService.get(`${this.baseUrl}/${id}`),
        'findOne',
      );
    } catch (error) {
      if (error instanceof BadRequestException && error.message.includes('404'))
        return null;
      throw error;
    }
  }

  update(id: string, dto: UpdateStaffDto) {
    return this.request(
      () => this.httpService.patch(`${this.baseUrl}/${id}`, dto),
      'update',
    );
  }

  remove(id: string) {
    return this.request(
      () => this.httpService.delete(`${this.baseUrl}/${id}`),
      'remove',
    );
  }

  findOneAvaiable(payload: any) {
    return this.request(
      () => this.httpService.post(`${this.baseUrl}/available`, payload),
      'findOneAvaiable',
    );
  }

  createScheduleForStaff(staffId: string, dto: CreateWorkScheduleDto) {
    return this.request(
      () =>
        this.httpService.post(`${this.baseUrl}/work-schedule/${staffId}`, dto),
      'createScheduleForStaff',
    );
  }

  removeSchedule(id: string) {
    return this.request(
      () => this.httpService.delete(`http://localhost:3002/work-schedules/${id}`),
      'remove',
    );
  }
}
