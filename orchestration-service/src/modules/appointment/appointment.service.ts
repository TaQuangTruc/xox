import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { StaffRepository } from '../staff/staff.repository';
import { CreateWorkScheduleDto } from '../staff/dto/create-schedule.dto';
import { RepeatType } from 'src/common/enums';
import { FindAvailableStaffDto } from '../staff/dto/find-avaiable-staff.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly staffRepository: StaffRepository,
  ) { }

  async create(dto: CreateAppointmentDto) {
    const scheduleMap = {
      Morning: { startTime: '07:00', endTime: '12:00' },
      Afternoon: { startTime: '13:00', endTime: '18:00' },
    };

    const session = scheduleMap[dto.examinationSession];
    if (!session) {
      throw new BadRequestException({
        message: 'Giá trị buổi khám không hợp lệ',
        errors: [
          { field: 'examinationSession', errors: ['Giá trị không hợp lệ'] },
        ],
      });
    }

    let createdWorkScheduleId: string | null = null;

    try {
      // 🔍 1. Tìm bác sĩ rảnh
      const availableStaff = await this.staffRepository.findOneAvaiable({
        specialty: dto.staffSpecialty,
        date: dto.examinationDate,
        startTime: session.startTime,
        endTime: session.endTime,
      });

      const staff = availableStaff?.data;
      if (!staff?.id || !staff.code || !staff.firstname || !staff.lastname) {
        throw new BadRequestException({
          message: availableStaff?.message || 'Không tìm thấy bác sĩ rảnh',
          errors: [{ field: 'staffId', errors: ['Không có bác sĩ phù hợp'] }],
        });
      }

      // 📅 2. Tạo lịch làm việc
      const schedule: CreateWorkScheduleDto = {
        title: `${dto.fullName} - ${dto.gender} - ${dto.phoneNumber}`,
        location: 'Phòng khám',
        scheduleDate: dto.examinationDate,
        startTime: staff.availableTime.startTime,
        endTime: staff.availableTime.endTime,
        repeatType: RepeatType.NONE,
      };

      const workScheduleRes = await this.staffRepository.createScheduleForStaff(
        staff.id,
        schedule,
      );

      if (!workScheduleRes?.data?.id) {
        throw new BadRequestException({
          message: workScheduleRes?.message || 'Tạo lịch làm việc thất bại',
          errors: [{ field: 'workSchedule', errors: ['Tạo lịch thất bại'] }],
        });
      }

      createdWorkScheduleId = workScheduleRes.data.id;

      // 📝 3. Tạo lịch hẹn với thông tin bác sĩ
      const appointmentPayload = {
        fullName: dto.fullName,
        email: dto.email,
        birthday: dto.birthday,
        phoneNumber: dto.phoneNumber,
        gender: dto.gender,
        address: dto.address,
        staffSpecialty: dto.staffSpecialty,
        examinationDate: dto.examinationDate,
        examinationTime: staff.availableTime.startTime,
        description: dto.description,
        doctorCode: staff.code,
        doctorName: `${staff.firstname} ${staff.lastname}`.trim(),
      };

      const appointmentRes =
        await this.appointmentRepository.create(appointmentPayload);

      if (!appointmentRes?.data) {
        throw new BadRequestException({
          message: appointmentRes?.message || 'Tạo lịch hẹn thất bại',
          errors: [{ field: 'appointment', errors: ['Tạo lịch hẹn thất bại'] }],
        });
      }

      return {
        message: 'Tạo lịch hẹn mới thành công',
        data: appointmentRes.data,
      };
    } catch (error) {
      console.error('[AppointmentService.create]', error?.message || error);

      // 🧹 Rollback nếu đã tạo lịch làm việc
      if (createdWorkScheduleId) {
        try {
          await this.staffRepository.removeSchedule(createdWorkScheduleId);
          console.warn(`Đã rollback workSchedule ${createdWorkScheduleId}`);
        } catch (rollbackError) {
          console.error(
            'Rollback thất bại:',
            rollbackError?.message || rollbackError,
          );
        }
      }

      // 🛑 Trả lỗi từ service con nếu có
      throw new BadRequestException({
        message:
          error?.response?.data?.message ||
          error?.message ||
          'Tạo lịch hẹn thất bại',
        errors: error?.response?.data?.errors || [
          { field: 'staffId', errors: ['Tạo lịch hẹn thất bại'] },
        ],
      });
    }
  }

  findAll() {
    return this.appointmentRepository.findAll();
  }

  findOne(id: string) {
    return this.appointmentRepository.findOne(id);
  }

  update(id: string, dto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, dto);
  }

  remove(id: string) {
    return this.appointmentRepository.remove(id);
  }
}
