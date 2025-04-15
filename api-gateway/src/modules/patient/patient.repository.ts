import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePatientDto } from './dto/createPatient.dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';
import { Patient } from './patient.interface';
import { AxiosError } from 'axios';
import { ResponseHandlerService } from 'src/common/utils/response-handler.service';

@Injectable()
export class PatientRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly handlerResponseService: ResponseHandlerService,
  ) {}

  private readonly baseUrl = 'http://localhost:3001/patients';

  async create(createDto: CreatePatientDto): Promise<Patient> {
    try {
      const res$ = this.httpService.post<ApiResponse<Patient>>(
        this.baseUrl,
        createDto,
      );
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      const res$ = this.httpService.get<ApiResponse<Patient[]>>(this.baseUrl);
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async findOne(id: string): Promise<Patient | null> {
    try {
      const res$ = this.httpService.get<ApiResponse<Patient>>(
        `${this.baseUrl}/${id}`,
      );
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      if (error.response?.status === 404) return null;
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async update(id: string, updateDto: UpdatePatientDto): Promise<Patient> {
    try {
      const res$ = this.httpService.patch<ApiResponse<Patient>>(
        `${this.baseUrl}/${id}`,
        updateDto,
      );
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const res$ = this.httpService.delete<ApiResponse<null>>(
        `${this.baseUrl}/${id}`,
      );
      const res = await lastValueFrom(res$);
      this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }
}
