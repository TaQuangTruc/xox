import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'database/entities/patient.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PATIENT_REPOSITORY } from 'common/constants';
import { PatientRepository } from './repository/patient.repository';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Patient])],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PATIENT_REPOSITORY,
      useClass: PatientRepository,
    },
  ],
})
export class AppModule {}
