import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { Gender } from 'src/common/enums';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ name: 'phone_number', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: false })
  address: string;

  @Column({ name: 'emergency_contact_name', nullable: true })
  emergencyContactName?: string;

  @Column({ name: 'emergency_contact_relationship', nullable: true })
  emergencyContactRelationship?: string;

  @Column({ name: 'emergency_contact_phone', nullable: true })
  emergencyContactPhone?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
