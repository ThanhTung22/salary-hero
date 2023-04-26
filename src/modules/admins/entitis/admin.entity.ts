import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ADMIN_TABLE_NAME } from '../admin.constant';
import { Company } from 'src/modules/companys/entities/company.entity';
import { AccountRole } from 'src/modules/auth/auth.constant';

@Entity({ name: ADMIN_TABLE_NAME })
export class Admin extends CommonEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: AccountRole, nullable: true })
  role: AccountRole;

  @Index('admin_company_id_idx')
  @Column({ type: 'uuid', nullable: true })
  companyId: string;

  @ManyToOne(() => Company, (company) => company.admin)
  company: Company;
}
