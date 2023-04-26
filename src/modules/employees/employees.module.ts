import { Module, forwardRef } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './employees.service';
import { Employee } from './entities/employees.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../companys/entities/company.entity';
import { CompanyModule } from '../companys/company.module';
import { CompanyService } from '../companys/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Company]),
    CompanyModule,
    forwardRef(() => CompanyModule),
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService, CompanyService],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}
