import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staffs')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ name: 'license_number', nullable: true })
  licenseNumber: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Column({ name: 'recruitment_date', nullable: false })
  recruitmentDate: Date;
}
