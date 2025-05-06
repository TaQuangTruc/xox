import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';
import { FindAvailableStaffDto } from './dto/find-avaiable-staff.dto';
import { validate as isUUID } from 'uuid';
import { WorkScheduleService } from '../schedule/schedule.service';
import { CreateWorkScheduleDto } from '../schedule/dto/create-schedule.dto';

@Controller('staffs')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly workScheduleService: WorkScheduleService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createDto: CreateStaffDto) {
    return this.staffService.create(createDto);
  }

  @Post('search')
  search(@Body() quickSearchDto: QuickSearchDto) {
    return this.staffService.quickSearch(quickSearchDto);
  }

  @Post('available')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAvailableStaff(@Body() dto: FindAvailableStaffDto) {
    const { specialty, date, startTime, endTime } = dto;
    const schedule = { startTime, endTime };
    return await this.staffService.findOneAvailable(specialty, schedule, date);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateStaffDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.staffService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.staffService.remove(id);
  }

  @Post('work-schedule/:id')
  async createScheduleForStaff(
    @Param('staffId') staffId: string,
    @Body() dto: CreateWorkScheduleDto,
  ) {
    return await this.workScheduleService.create(staffId, dto);
  }
}
