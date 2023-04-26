import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employees.entity';
import { CompanyService } from '../companys/company.service';
import { Repository } from 'typeorm';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './dto/create-employee.dto';
import { hashPassword } from 'src/common/utils/password.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
    companyId: string,
  ): Promise<Employee> {
    const { email, password, ...dto } = createEmployeeDto;
    const employeeData = await this.employeeRepository.findOne({
      where: { email },
    });
    if (employeeData) {
      throw new ConflictException('Employee has already existed!');
    }

    if (companyId !== dto.companyId) {
      throw new BadRequestException('Permision denied for company');
    }
    const company = await this.companyService.findOne(dto.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const passwordhash = await hashPassword(password);
    const createEmployee = {
      email,
      password: passwordhash,
      ...dto,
    };
    const data = this.employeeRepository.create(createEmployee);
    return this.employeeRepository.save(data);
  }

  async findAllAdmin(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOneAdmin(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    companyId: string,
  ): Promise<Employee> {
    const company = await this.companyService.findOne(
      updateEmployeeDto.companyId,
    );

    if (companyId !== updateEmployeeDto.companyId) {
      throw new BadRequestException('Permision denied for company');
    }

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    await this.employeeRepository.update(id, UpdateEmployeeDto);
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
