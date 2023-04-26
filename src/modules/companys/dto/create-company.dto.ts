import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ default: 'SL' })
  @IsString()
  code: string;

  @ApiProperty({ default: 'Super Salary' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'Ha Noi' })
  @IsString()
  address: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
