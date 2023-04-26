import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { typeOrmModuleOptions } from './common/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './modules/companys/company.module';
import { MoneyTransferModule } from './modules/money-transfer/money-transfer.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './modules/employees/employees.module';
import { AdminModule } from './modules/admins/admin.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    CompanyModule,
    EmployeesModule,
    AdminModule,
    MoneyTransferModule,
    AuthModule,
  ],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
