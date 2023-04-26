import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseAppGuard } from '../auth/decorators/use-app-guard.decorator';
import { AccountRole } from '../auth/auth.constant';
import { Roles } from '../auth/decorators/role-decorator';
import { MoneyTranfer } from './entities/money-transfer.entity';
import { MoneyTransferService } from './money-transfer.service';
import { RequestMoneyDto } from './dto/request-money.dto';
import { Employee } from '../employees/entities/employees.entity';
import { UserTokens } from 'src/common/decorator/user-token.decorator';

@ApiTags('MONEY-TRANFER')
@ApiBearerAuth()
@UseAppGuard()
@Roles(AccountRole.EMPLOYEE)
@Controller('money-transfer')
export class MoneyTransferController {
  constructor(private readonly moneyTransferService: MoneyTransferService) {}

  @Post()
  @ApiOperation({ summary: 'Create Money Request By Employee' })
  async create(
    @Body() requestMoneyDto: RequestMoneyDto,
    @UserTokens() { id }: Employee,
  ): Promise<MoneyTranfer> {
    return await this.moneyTransferService.createRequest(requestMoneyDto, id);
  }
}
