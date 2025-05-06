import { CreateStaffDto } from '../dto/createStaff.dto';
import { UpdateStaffDto } from '../dto/updateStaff.dto';
import { QuickSearchDto } from '../dto/quickSearch.dto';

export interface IStaffService {
  create(dto: CreateStaffDto): Promise<any>;
  findOne(id: string): Promise<any>;
  update(id: string, dto: UpdateStaffDto): Promise<any>;
  remove(id: string): Promise<any>;
  quickSearch(dto: QuickSearchDto): Promise<any>;
}
