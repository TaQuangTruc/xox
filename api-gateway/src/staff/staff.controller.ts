/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    const staff = await this.staffService.create(createStaffDto);
    return { message: 'Staff created successfully', data: staff };
  }

  @Get()
  async findAll() {
    const staffs = await this.staffService.findAll();
    return { message: 'Staffs retrieved successfully', data: staffs };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const staff = await this.staffService.findOne(id);
    return { message: 'Staff retrieved successfully', data: staff };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    const staff = await this.staffService.update(id, updateStaffDto);
    return { message: 'Staff updated successfully', data: staff };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.staffService.delete(id);
    return { message: 'Staff deleted successfully' };
  }
}
