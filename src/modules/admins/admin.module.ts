import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entitis/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../companys/company.module';
import { CompanyService } from '../companys/company.service';
import { Company } from '../companys/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Company]),
    CompanyModule,
    forwardRef(() => CompanyModule),
  ],
  controllers: [AdminController],
  providers: [AdminService, CompanyService],
  exports: [TypeOrmModule],
})
export class AdminModule {}
