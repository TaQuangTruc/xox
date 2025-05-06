export enum Gender {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

export enum StaffRole {
  Doctor = 'Bác sĩ',
  Nurse = 'Y tá',
  Admin = 'Admin',
  Technician = 'Nhân viên kỹ thuật',
}

export enum StaffSpecialty {
  InternalMedicine = 'Nội',
  Surgery = 'Ngoại',
  Pediatrics = 'Nhi',
  Obstetrics = 'Sản',
  Cardiology = 'Tim mạch',
  Other = 'Khác',
}

export enum StaffStatus {
  PA = 'Pending Active',     // Chờ hoạt động
  A = 'Active',              // Hoạt động
  I = 'Inactive',            // Đã nghỉ làm
  L = 'Long Leave',          // Nghỉ dài hạn
  S = 'Short Leave'          // Nghỉ ngắn hạn
}

export enum FieldOperator {
  LIKE = 'LIKE',
  EQUAL = 'EQUAL',
}

export enum RepeatType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  // Các loại lặp khác nếu cần
}


