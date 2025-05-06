import { Staff } from 'src/database/entities/staff.entity';
import { CreateStaffDto } from '../dto/createStaff.dto';
import { UpdateStaffDto } from '../dto/updateStaff.dto';

export interface IStaffRepository {
  findByPhoneOrLicense(phone: string, license: string): Promise<Staff | null>;
  findByCode(code: string): Promise<Staff | null>;
  findById(id: string): Promise<Staff | null>;
  createStaff(data: Partial<Staff>): Staff;
  save(staff: Staff): Promise<Staff>;
  delete(staff: Staff): Promise<void>;
  search(
    conditions: any[],
    page: number,
    limit: number,
  ): Promise<[Staff[], number]>;
  findAvailableDoctors(specialty: string, date: string): Promise<Staff[]>;
}
