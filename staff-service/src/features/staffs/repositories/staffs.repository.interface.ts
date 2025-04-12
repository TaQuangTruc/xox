import { Staff } from '../entities/staff.entity';

export interface IStaffRepository {
  create(data: Partial<Staff>): Staff;
  save(staff: Staff): Promise<Staff>;
  find(): Promise<Staff[]>;
  findOne(id: string): Promise<Staff>;
  remove(staff: Staff): Promise<void>;
}
