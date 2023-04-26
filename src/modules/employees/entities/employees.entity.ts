import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/modules/companys/entities/company.entity';
import { EMPLOYEES_TABLE_NAME } from '../employees.constant';
import { DecimalColumn } from 'src/common/decorator';
import { AccountRole } from 'src/modules/auth/auth.constant';
import { MoneyTranfer } from 'src/modules/money-transfer/entities/money-transfer.entity';

@Entity({ name: EMPLOYEES_TABLE_NAME })
export class Employee extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @DecimalColumn({ type: 'float', nullable: true })
  salary: number;

  @Column({ type: 'enum', enum: AccountRole, nullable: true })
  role: AccountRole;

  @Index('employee_company_id_idx')
  @Column({ type: 'uuid', nullable: true })
  companyId: string;

  @ManyToOne(() => Company, (company) => company.employees)
  company: Company;

  @OneToMany(() => MoneyTranfer, (moneyTranfer) => moneyTranfer.employeeId)
  moneyTranfer: MoneyTranfer[];
}
