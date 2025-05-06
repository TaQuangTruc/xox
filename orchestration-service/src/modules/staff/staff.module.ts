import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResponseHandlerService } from 'src/common/utils/response-handler.service';
import { StaffService } from './staff.service';
import { StaffRepository } from './staff.repository';
import { StaffController } from './staff.controller';

@Module({
  imports: [HttpModule],
  providers: [ResponseHandlerService, StaffService, StaffRepository],
  controllers: [StaffController],
})
export class StaffModule {}
