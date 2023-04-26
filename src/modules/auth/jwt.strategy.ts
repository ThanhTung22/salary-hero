import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_STRATEGY_KEY } from './auth.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admins/entitis/admin.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employees.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { accountId } = payload;
    const admin = await this.adminRepository.findOneBy({ id: accountId });

    const employee = await this.employeeRepository.findOneBy({ id: accountId });

    if (!admin && !employee) throw new UnauthorizedException();

    return admin ? admin : employee;
  }
}
