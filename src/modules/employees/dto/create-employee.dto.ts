import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { AccountRole } from 'src/modules/auth/auth.constant';

export class CreateEmployeeDto {
  @ApiProperty({ default: 'lethanhtung7688@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'Le Thanh Tung' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'Abc@12345' })
  @IsString()
  password: string;

  @ApiProperty({ default: '5000' })
  @IsNumber()
  salary: number;

  @ApiProperty({ default: AccountRole.EMPLOYEE })
  @IsEnum(AccountRole)
  role: AccountRole;

  @ApiProperty({ default: '3f8de212-140e-4564-816a-29f4e60c1707' })
  @IsString()
  companyId: string;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
