import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BaseRepository } from 'src/common/base-repository';

@Injectable()
export class AppointmentRepository extends BaseRepository {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  private readonly baseUrl = 'http://localhost:3003/appointments';

  create(dto: any) {
    return this.request(
      () => this.httpService.post(this.baseUrl, dto),
      'create',
    );
  }

  findAll() {
    return this.request(() => this.httpService.get(this.baseUrl), 'findAll');
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

  update(id: string, dto: UpdateAppointmentDto) {
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

}
