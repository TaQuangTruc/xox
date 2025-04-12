import { PatientStatus } from 'common/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hoTenDem: string;

  @Column()
  ten: string;

  @Column({ type: 'date' })
  ngaySinh: Date;

  @Column()
  gioiTinh: 'Nam' | 'Nữ' | 'Khác';

  @Column()
  soDienThoaiChinh: string;

  @Column()
  diaChiHienTai: string;

  @Column({ nullable: true })
  tenLienHeKhanCap?: string;

  @Column({ nullable: true })
  quanHeLienHeKhanCap?: string;

  @Column({ nullable: true })
  soDienThoaiLienHeKhanCap?: string;

  @Column({
    type: 'enum',
    enum: PatientStatus,
    default: PatientStatus.UNVERIFIED,
  })
  trangThai: PatientStatus;
}
