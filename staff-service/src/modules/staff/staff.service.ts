import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { IStaffService } from './interfaces/staffService.interface';
import { IDoctorAvailableChecker } from './interfaces/doctorAvailableChecker.interface';
import { IStaffRepository } from './interfaces/staffRepository.interface';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class StaffService implements IStaffService, IDoctorAvailableChecker {
  constructor(
    @Inject('IStaffRepository') private readonly repo: IStaffRepository,
  ) {}

  async create(dto: CreateStaffDto) {
    const existing = await this.repo.findByPhoneOrLicense(
      dto.phoneNumber,
      dto.licenseNumber,
    );
    if (existing) {
      const field =
        existing.phoneNumber === dto.phoneNumber
          ? 'phoneNumber'
          : 'licenseNumber';
      throw new BadRequestException({
        message: 'Validation failed',
        errors: [
          {
            field,
            errors: [
              `${field === 'phoneNumber' ? 'Số điện thoại' : 'Bằng cấp'} đã được sử dụng`,
            ],
          },
        ],
      });
    }

    let code: string;
    do {
      code = this.generateRandomCode();
    } while (await this.repo.findByCode(code));

    const staff = this.repo.createStaff({ ...dto, code });
    await this.repo.save(staff);

    return { message: 'Tạo nhân viên thành công', data: staff };
  }

  async findOne(id: string) {
    const staff = await this.findOrThrow(id);
    return { message: 'Lấy thông tin nhân viên thành công', data: staff };
  }

  async update(id: string, dto: UpdateStaffDto) {
    const staff = await this.findOrThrow(id);
    Object.assign(staff, dto);
    await this.repo.save(staff);
    return { message: 'Cập nhật thông tin nhân viên thành công', data: staff };
  }

  async remove(id: string) {
    const staff = await this.findOrThrow(id);
    await this.repo.delete(staff);
    return { message: 'Xóa thông tin nhân viên thành công', data: staff };
  }

  async quickSearch({ quickSearch, pagination }: QuickSearchDto) {
    const { page = 1, limit = 10 } = pagination || {};
    try {
      const conditions =
        quickSearch?.filter((s) => s.fieldname && s.fieldvalue && s.fieldop) ??
        [];
      const [data, total] = await this.repo.search(conditions, page, limit);

      return {
        message: 'Lấy danh sách nhân viên thành công',
        data,
        meta: {
          pagination: {
            page,
            limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error executing search',
        errors: [
          { field: 'quickSearch', errors: ['Xảy ra lỗi khi quickSearch'] },
        ],
      });
    }
  }

  async findOneAvailable(
    specialty: string,
    schedule: { startTime: string; endTime: string },
    date: string,
  ) {
    try {
      const start = new Date(`${date}T${schedule.startTime}`);
      const end = new Date(`${date}T${schedule.endTime}`);
      const staffs = await this.repo.findAvailableDoctors(specialty, date);
      console.log(staffs);

      const sorted = staffs.sort(
        (a, b) =>
          (a.workSchedules?.filter((s) => s.scheduleDate === date).length ??
            0) -
          (b.workSchedules?.filter((s) => s.scheduleDate === date).length ?? 0),
      );

      // 7G 7G20
      // 7G20 7G40 
      // 8G0 - 8G20

      for (const staff of sorted) {
        const schedules = (staff.workSchedules ?? [])
          .filter((s) => s.scheduleDate === date)
          .sort(
            (a, b) =>
              new Date(`${date}T${a.startTime}`).getTime() -
              new Date(`${date}T${b.startTime}`).getTime(),
          );

        let bestStart: Date | null = null;
        let bestGap = 0;

        const checkGap = (from: Date, to: Date) => {
          const gap = (to.getTime() - from.getTime()) / 60000;
          if (gap >= 20 && gap > bestGap) {
            bestGap = gap;
            bestStart = new Date(from);
          }
        };

        if (!schedules.length) {
          checkGap(start, end);
        } else {
          checkGap(start, new Date(`${date}T${schedules[0].startTime}`));
          for (let i = 1; i < schedules.length; i++) {
            checkGap(
              new Date(`${date}T${schedules[i - 1].endTime}`),
              new Date(`${date}T${schedules[i].startTime}`),
            );
          }
          checkGap(
            new Date(`${date}T${schedules[schedules.length - 1].endTime}`),
            end,
          );
        }

        if (bestStart) {
          const bestEnd = new Date((bestStart as Date).getTime() + 20 * 60000);
          return {
            message: 'Lấy danh sách nhân viên thành công',
            data: {
              id: staff.id,
              code: staff.code,
              firstname: staff.firstname,
              lastname: staff.lastname,
              availableTime: {
                startTime: (bestStart as Date).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                endTime: bestEnd.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            },
          };
        }
      }

      return { message: 'Không tìm thấy nhân viên phù hợp', data: null };
    } catch (error) {
      throw new HttpException(
        'Error finding available staff: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findOrThrow(id: string) {
    const staff = await this.repo.findById(id);
    if (!staff) {
      throw new BadRequestException({
        message: 'Staff not found',
        errors: [
          {
            field: 'staffId',
            errors: [`Không tồn tại nhân viên với id: ${id}`],
          },
        ],
      });
    }
    return staff;
  }

  private generateRandomCode(prefix = 'NV') {
    return `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;
  }
}
