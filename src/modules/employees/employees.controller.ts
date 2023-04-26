import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Employee } from './entities/employees.entity';
import { EmployeeService } from './employees.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './dto/create-employee.dto';
import { AccountRole } from '../auth/auth.constant';
import { UseAppGuard } from '../auth/decorators/use-app-guard.decorator';
import { Roles } from '../auth/decorators/role-decorator';
import { Admin } from '../admins/entitis/admin.entity';
import { UserTokens } from 'src/common/decorator/user-token.decorator';

@ApiTags('EMPLOYEE')
@ApiBearerAuth()
@UseAppGuard()
@Roles(AccountRole.ADMIN)
@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Employee By Admin' })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UserTokens() { companyId }: Admin,
  ): Promise<Employee> {
    return await this.employeeService.create(createEmployeeDto, companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Employee By Admin' })
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Employee By Admin' })
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOneAdmin(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Employee By Admin' })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UserTokens() { companyId }: Admin,
  ): Promise<Employee> {
    return await this.employeeService.update(id, updateEmployeeDto, companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Employee By Admin' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.employeeService.delete(id);
  }
}
