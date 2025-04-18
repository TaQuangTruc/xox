import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/database/entities/staff.entity';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleController } from './schedule.controller';
import { WorkSchedule } from 'src/database/entities/work-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, WorkSchedule])],
  providers: [WorkScheduleService],
  controllers: [WorkScheduleController],
})
export class ScheduleModule {}
