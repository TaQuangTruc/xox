import { Module } from '@nestjs/common';
import { StaffService } from './staffs.service';
import { StaffController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffRepository } from './repositories/staffs.repository';

@Module({
  controllers: [StaffController],
  providers: [
    StaffService,
    {
      provide: 'STAFF_REPOSITORY',
      useClass: StaffRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Staff])],
})
export class StaffsModule {}
