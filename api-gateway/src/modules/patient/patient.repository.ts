import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePatientDto } from './dto/createPatient.dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';
import { AxiosError } from 'axios';

@Injectable()
export class PatientRepository {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'http://localhost:3012/patients';

  async create(createDto: CreatePatientDto) {
    try {
      const res$ = this.httpService.post(this.baseUrl, createDto);
      const res = await lastValueFrom(res$);

      console.log(res);
    } catch (error) {}
  }

  async findAll() {
    try {
      const res$ = this.httpService.get(this.baseUrl);
      const res = await lastValueFrom(res$);

      console.log(res.data);

      return res;
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      const res$ = this.httpService.get(`${this.baseUrl}/${id}`);
      const res = await lastValueFrom(res$);
    } catch (error) {
      if (error.response?.status === 404) return null;
    }
  }

  async update(id: string, updateDto: UpdatePatientDto) {
    try {
      const res$ = this.httpService.patch(`${this.baseUrl}/${id}`, updateDto);
      const res = await lastValueFrom(res$);
    } catch (error) {}
  }

  async remove(id: string) {
    try {
      const res$ = this.httpService.delete<ApiResponse<null>>(
        `${this.baseUrl}/${id}`,
      );
      const res = await lastValueFrom(res$);
    } catch (error) {}
  }
}
