import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { Schedule } from './schedule.entity';
import { Role, Specialty } from 'src/common/enums';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  @IsEnum(Role)
  role: Role;

  @Column({
    type: 'enum',
    enum: Specialty,
    nullable: true, // Chỉ bắt buộc với Doctor, validate trong Service
  })
  @IsEnum(Specialty)
  specialty?: Specialty;

  @Column({ name: 'license_number', nullable: true }) // Bắt buộc với Doctor
  licenseNumber?: string;

  @Column({ name: 'phone_number', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ name: 'hire_date', type: 'date', nullable: false })
  hireDate: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.staff)
  schedules: Schedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
