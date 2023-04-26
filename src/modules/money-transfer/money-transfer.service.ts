import { Injectable, BadRequestException } from '@nestjs/common';
import { MoneyTranfer } from './entities/money-transfer.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestMoneyDto } from './dto/request-money.dto';
import { EmployeeService } from '../employees/employees.service';

@Injectable()
export class MoneyTransferService {
  constructor(
    @InjectRepository(MoneyTranfer)
    private readonly moneyTranferRepository: Repository<MoneyTranfer>,
    private readonly employeeService: EmployeeService,
    private dataSource: DataSource,
  ) {}

  async createRequest(
    requestMoneyDto: RequestMoneyDto,
    employeeId: string,
  ): Promise<MoneyTranfer> {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1);

    const { amount } = requestMoneyDto;

    const { salary } = await this.employeeService.findOneAdmin(employeeId);

    const queryRunner = this.dataSource.getRepository(MoneyTranfer);

    const requestForMonth = await queryRunner
      .createQueryBuilder('money_tranfer')
      .where(`money_tranfer.createdAt > :firstDay`, { firstDay })
      .andWhere(`money_tranfer.createdAt < :lastDay`, { lastDay })
      .getMany();

    const maxTranferAmount = (50 / 100) * salary;
    const totalMonth = requestForMonth.reduce(
      (pre, cru) => pre + cru['amount'],
      0,
    );

    if (totalMonth + amount >= maxTranferAmount) {
      throw new BadRequestException('Salary has exceeded the limit');
    }
    return this.moneyTranferRepository.save({ ...requestMoneyDto, employeeId });
  }
}
