import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { QuickSearchDto } from './dto/quickSearch.dto';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  create(dto: CreateStaffDto) {
    return this.staffRepository.create(dto);
  }

  search(quickSearchDto: QuickSearchDto) {
    return this.staffRepository.search(quickSearchDto); // Trả trực tiếp Staff[] hoặc null
  }

  findOne(id: string) {
    return this.staffRepository.findOne(id);
  }

  update(id: string, dto: UpdateStaffDto) {
    return this.staffRepository.update(id, dto);
  }

  remove(id: string) {
    return this.staffRepository.remove(id);
  }
}
