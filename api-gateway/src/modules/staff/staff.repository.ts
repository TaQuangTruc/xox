import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Staff } from './staff.interface';
import { AxiosError } from 'axios';
import { ResponseHandlerService } from 'src/common/utils/response-handler.service';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';

@Injectable()
export class StaffRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly handlerResponseService: ResponseHandlerService,
  ) {}

  private readonly baseUrl = 'http://localhost:3002/staffs';

  async create(createDto: CreateStaffDto): Promise<Staff> {
    try {
      const res$ = this.httpService.post<ApiResponse<Staff>>(
        this.baseUrl,
        createDto,
      );
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async findAll(): Promise<Staff[]> {
    try {
      const res$ = this.httpService.get<ApiResponse<Staff[]>>(this.baseUrl);
      const res = await lastValueFrom(res$);
      console.log(res);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async findOne(id: string): Promise<Staff | null> {
    try {
      const res$ = this.httpService.get<ApiResponse<Staff>>(
        `${this.baseUrl}/${id}`,
      );
      const res = await lastValueFrom(res$);
      return this.handlerResponseService.handleResponse(res.data);
    } catch (error) {
      if (error.response?.status === 404) return null;
      this.handlerResponseService.handleAxiosError(error);
    }
  }

  async update(id: string, updateDto: UpdateStaffDto): Promise<Staff> {
    try {
      const res$ = this.httpService.patch<ApiResponse<Staff>>(
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
