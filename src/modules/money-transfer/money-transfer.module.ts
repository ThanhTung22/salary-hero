import { Module, forwardRef } from '@nestjs/common';
import { MoneyTransferController } from './money-transfer.controller';
import { MoneyTransferService } from './money-transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyTranfer } from './entities/money-transfer.entity';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeeService } from '../employees/employees.service';
import { Employee } from '../employees/entities/employees.entity';
import { CompanyModule } from '../companys/company.module';
import { CompanyService } from '../companys/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoneyTranfer, Employee]),
    EmployeesModule,
    forwardRef(() => EmployeesModule),
    CompanyModule,
    forwardRef(() => CompanyModule),
  ],
  controllers: [MoneyTransferController],
  providers: [MoneyTransferService, EmployeeService, CompanyService],
})
export class MoneyTransferModule {}
