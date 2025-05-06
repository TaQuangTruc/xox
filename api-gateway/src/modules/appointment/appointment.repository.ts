import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Injectable()
export class AppointmentRepository {
  private readonly logger = new Logger(AppointmentRepository.name);
  private readonly baseUrl = 'http://localhost:3003/appointments';

  constructor(private readonly httpService: HttpService) { }

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

  async create(createDto: CreateAppointmentDto) {
    return this.handleRequest(
      this.httpService.post('http://localhost:3011/appointments', createDto),
    );
  }

  async search(quickSearchDto: QuickSearchDto) {
    return this.handleRequest(
      this.httpService.post(`http://localhost:3003/appointments/search`, quickSearchDto || {})
    );
    // return this.handleRequest(this.httpService.get(`${this.baseUrl}`));
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

  async update(id: string, updateDto: UpdateAppointmentDto) {
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
