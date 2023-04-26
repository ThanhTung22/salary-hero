import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from 'src/common/config/jwt.config';
import { AdminModule } from '../admins/admin.module';
import { CompanyModule } from '../companys/company.module';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeeService } from '../employees/employees.service';
import { CompanyService } from '../companys/company.service';
import { AdminService } from '../admins/admin.service';
import { RolesAuthGuard } from './guards/roles.guard';

@Module({
  imports: [
    AdminModule,
    forwardRef(() => AdminModule),
    CompanyModule,
    forwardRef(() => CompanyModule),
    EmployeesModule,
    forwardRef(() => EmployeesModule),
    JwtModule.register(jwtConfig),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    EmployeeService,
    CompanyService,
    AdminService,
    RolesAuthGuard,
  ],
})
export class AuthModule {}
