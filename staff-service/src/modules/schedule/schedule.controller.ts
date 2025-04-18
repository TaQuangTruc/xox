// work-schedule.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { CreateWorkScheduleDto } from './dto/create-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-schedule.dto';
import { QuickSearchWorkScheduleDto } from './dto/quick-search.dto';

@Controller('work-schedules')
export class WorkScheduleController {
  constructor(private readonly service: WorkScheduleService) {}

  @Post('/:staffId')
  create(
    @Param('staffId') staffId: string,
    @Body() body: CreateWorkScheduleDto,
  ) {
    return this.service.create(staffId, body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateWorkScheduleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get('/staff/:staffId')
  quickSearch(@Param('staffId') staffId: string, @Body() quickSearchDto: QuickSearchWorkScheduleDto) {
    return this.service.quickSearch(staffId, quickSearchDto);
  }
}
