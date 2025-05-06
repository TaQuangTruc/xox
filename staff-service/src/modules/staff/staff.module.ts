import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/database/entities/staff.entity';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { ScheduleModule } from '../schedule/schedule.module';
import { StaffRepository } from './staff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Staff]), ScheduleModule],
  providers: [
    {
      provide: 'IStaffRepository',
      useClass: StaffRepository,
    },
    {
      provide: StaffService,
      useClass: StaffService,
    },
  ],
  exports: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
