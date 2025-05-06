import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { CreateWorkScheduleDto } from './dto/create-schedule.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class StaffRepository {
  private readonly logger = new Logger(StaffRepository.name);
  private readonly baseUrl = 'http://localhost:3002/staffs';

  constructor(private readonly httpService: HttpService) {}

  private async handleRequest<T>(
    observable: Observable<AxiosResponse<T>>,
  ): Promise<T | null> {
    try {
      const response = await lastValueFrom(observable);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  private handleError(error: any) {
    if (error instanceof AxiosError) {
      this.logger.error(`Axios error: ${error.message}`);
    } else {
      this.logger.error('Unknown error', error);
    }
  }

  async create(createDto: CreateStaffDto) {
    return this.handleRequest(this.httpService.post(this.baseUrl, createDto));
  }

  async search(quickSearchDto: QuickSearchDto) {
    return this.handleRequest(
      this.httpService.post(`${this.baseUrl}/search`, quickSearchDto || {})
    );
  }

  async findOne(id: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/${id}`),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      this.handleError(error);
      return null;
    }
  }

  async update(id: string, updateDto: UpdateStaffDto) {
    return this.handleRequest(
      this.httpService.patch(`${this.baseUrl}/${id}`, updateDto),
    );
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.handleRequest(
      this.httpService.delete(`${this.baseUrl}/${id}`),
    );
    return !!result;
  }
}
