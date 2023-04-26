import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordHash } from '../../common/utils/password.util';
import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admins/entitis/admin.entity';
import { LoginDto, LoginResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;
    const existAdmin = await this.adminRepository.findOneBy({ email });
    const existEmployee = await this.employeeRepository.findOneBy({ email });

    if (!existAdmin && !existEmployee) throw new NotFoundException();

    const isPasswordValid = await comparePasswordHash(
      password,
      existAdmin ? existAdmin.password : existEmployee.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException();

    return {
      accessToken: this.jwtService.sign({
        accountId: existAdmin ? existAdmin.id : existEmployee.id,
      }),
      role: existAdmin ? existAdmin.role : existEmployee.role,
    };
  }
}
