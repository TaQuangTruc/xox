import { Gender } from 'src/common/enums';

export interface Patient {
  id: string;
  fullName: string;
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  phoneNumber: string;
  address: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}
