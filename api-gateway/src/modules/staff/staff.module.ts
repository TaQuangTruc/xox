import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaffService } from './staff.service';
import { StaffRepository } from './staff.repository';
import { StaffController } from './staff.controller';

@Module({
  imports: [HttpModule],
  providers: [StaffService, StaffRepository],
  exports: [StaffRepository],
  controllers: [StaffController],
})
export class StaffModule {}
