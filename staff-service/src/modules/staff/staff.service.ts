import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/createStaff.dto';
import { Staff } from 'src/database/entities/staff.entity';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { ResponseFormatter } from 'src/common/formatters/response.formatter';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(
    createStaffDto: CreateStaffDto,
  ): Promise<ApiResponse<Staff | null>> {
    const { role, specialty, licenseNumber, phoneNumber, email } =
      createStaffDto;

    // Validate Doctor
    if (role === 'Doctor') {
      if (!specialty) {
        return ResponseFormatter.error('Chuyên môn là bắt buộc với bác sĩ');
      }
      if (!licenseNumber) {
        return ResponseFormatter.error(
          'Số giấy phép hành nghề là bắt buộc với bác sĩ',
        );
      }
    }

    // Kiểm tra trùng
    const existingStaff = await this.staffRepository.findOne({
      where: [{ phoneNumber }, { email }],
    });
    if (existingStaff) {
      return ResponseFormatter.error('Số điện thoại hoặc email đã tồn tại');
    }

    const staff = this.staffRepository.create({
      ...createStaffDto,
      hireDate: new Date(createStaffDto.hireDate),
    });
    return ResponseFormatter.success('Staff found successfully.', staff);
  }

  async findAll(): Promise<ApiResponse<Staff[] | null>> {
    const listStaff = await this.staffRepository.find();
    return ResponseFormatter.success('Staffs found successfully.', listStaff);
  }

  async findOne(id: string): Promise<ApiResponse<Staff | null>> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    return ResponseFormatter.success('Staff found successfully.', staff);
  }

  async update(
    id: string,
    updateStaffDto: UpdateStaffDto,
  ): Promise<ApiResponse<Staff | null>> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    if (!staff) {
      return ResponseFormatter.error('Không tìm thấy nhân viên');
    }

    // Validate Doctor
    if (
      updateStaffDto.role === 'Doctor' ||
      (staff.role === 'Doctor' && !updateStaffDto.role)
    ) {
      if (
        updateStaffDto.specialty === null ||
        (!staff.specialty && !updateStaffDto.specialty)
      ) {
        return ResponseFormatter.error('Chuyên môn là bắt buộc với bác sĩ');
      }
      if (
        updateStaffDto.licenseNumber === null ||
        (!staff.licenseNumber && !updateStaffDto.licenseNumber)
      ) {
        return ResponseFormatter.error(
          'Số giấy phép hành nghề là bắt buộc với bác sĩ',
        );
      }
    }

    // Kiểm tra trùng
    if (updateStaffDto.phoneNumber || updateStaffDto.email) {
      const existingStaff = await this.staffRepository.findOne({
        where: [
          { phoneNumber: updateStaffDto.phoneNumber },
          { email: updateStaffDto.email },
        ],
      });
      if (existingStaff && existingStaff.id !== id) {
        return ResponseFormatter.error('Số điện thoại hoặc email đã tồn tại');
      }
    }

    Object.assign(staff, {
      ...updateStaffDto,
      hireDate: updateStaffDto.hireDate
        ? new Date(updateStaffDto.hireDate)
        : staff.hireDate,
    });

    const updatedStaff: Staff = await this.staffRepository.save(staff);

    return ResponseFormatter.success(
      'Staff updated successfully.',
      updatedStaff,
    );
  }

  async remove(id: string): Promise<ApiResponse<void | null>> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    if (!staff) {
      return ResponseFormatter.error('Staff not found');
    }

    await this.staffRepository.remove(staff);

    return ResponseFormatter.success('Staff deleted successfully', null);
  }
}
