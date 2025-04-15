import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { Schedule } from 'src/database/entities/schedule.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { ScheduleController } from './staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Staff])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
