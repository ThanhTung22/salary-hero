import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, Index, ManyToOne, OneToOne } from 'typeorm';
import { MONEY_TRANSFER_TABLE_NAME } from '../money-transfer.constant';
import { Employee } from 'src/modules/employees/entities/employees.entity';
import { DecimalColumn } from 'src/common/decorator';

@Entity({ name: MONEY_TRANSFER_TABLE_NAME })
export class MoneyTranfer extends CommonEntity {
  @DecimalColumn({ type: 'float', nullable: true })
  amount: number;

  @Index('money_tranfer_employee_id_idx')
  @Column({ type: 'uuid', nullable: true })
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.moneyTranfer)
  employee: Employee;
}
