import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/createPatient.dto';
import { Patient } from 'src/database/entities/patient.entity';
import { UpdatePatientDto } from './dto/updatePatient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createDto: CreatePatientDto) {
    return this.patientService.create(createDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePatientDto,
  ){
    return this.patientService.update(id, updateDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.patientService.remove(id);
  // }
}
