import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { COMPANY_TABLE_NAME } from '../company.constant';
import { Employee } from 'src/modules/employees/entities/employees.entity';
import { Admin } from 'src/modules/admins/entitis/admin.entity';

@Entity({ name: COMPANY_TABLE_NAME })
export class Company extends CommonEntity {
  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @OneToMany(() => Admin, (admin) => admin.companyId)
  admin: Admin[];

  @OneToMany(() => Employee, (employee) => employee.companyId)
  employees: Employee[];
}
