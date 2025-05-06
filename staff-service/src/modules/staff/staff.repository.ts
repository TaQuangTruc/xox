import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/database/entities/staff.entity';
import { IStaffRepository } from './interfaces/staffRepository.interface';
import { StaffRole, StaffStatus } from 'src/common/enums';

@Injectable()
export class StaffRepository implements IStaffRepository {
  constructor(
    @InjectRepository(Staff)
    private readonly repo: Repository<Staff>,
  ) { }

  findByPhoneOrLicense(phone: string, license: string) {
    return this.repo.findOne({
      where: [{ phoneNumber: phone }, { licenseNumber: license }],
    });
  }

  findByCode(code: string) {
    return this.repo.findOne({ where: { code } });
  }

  createStaff(data: Partial<Staff>): Staff {
    return this.repo.create(data);
  }

  save(staff: Staff) {
    return this.repo.save(staff);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  delete(staff: Staff) {
    return this.repo.remove(staff).then(() => { });
  }

  async search(
    conditions: any[],
    page: number,
    limit: number,
  ): Promise<[Staff[], number]> {
    const queryBuilder = this.repo.createQueryBuilder('staff');
    conditions.forEach((cond, i) => {
      const param = `value${i}`;
      const column = `LOWER(staff.${cond.fieldname})`;
      const value = cond.fieldvalue.trim().toLowerCase();

      if (cond.fieldop === 'LIKE') {
        queryBuilder.andWhere(`${column} LIKE :${param}`, {
          [param]: `%${value}%`,
        });
      } else {
        queryBuilder.andWhere(`${column} = :${param}`, { [param]: value });
      }
    });

    queryBuilder.skip((page - 1) * limit).take(limit);
    return Promise.all([queryBuilder.getMany(), queryBuilder.getCount()]);
  }

  findAvailableDoctors(specialty: string, date: string) {
    return this.repo
      .createQueryBuilder('staff')
      .leftJoinAndSelect(
        'staff.workSchedules',
        'schedule',
        'schedule.scheduleDate = :date',
        { date },
      )
      .where('staff.role = :role', { role: StaffRole.Doctor })
      .andWhere('staff.specialty = :specialty', { specialty })
      .andWhere('staff.status = :status', { status: StaffStatus.PA })
      .orderBy('staff.id', 'ASC')
      .getMany();
  }
}
