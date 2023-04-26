import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RequestMoneyDto {
  @ApiProperty({ default: '5000' })
  @IsNumber()
  amount: number;
}
