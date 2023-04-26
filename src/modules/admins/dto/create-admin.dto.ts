import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { AccountRole } from 'src/modules/auth/auth.constant';

export class CreateAdminDto {
  @ApiProperty({ default: 'lethanhtung7688@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'Le Thanh Tung' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'Abc@12345' })
  @IsString()
  password: string;

  @ApiProperty({ default: '3f8de212-140e-4564-816a-29f4e60c1707' })
  @IsString()
  companyId: string;

  @ApiProperty({ default: AccountRole.ADMIN })
  @IsEnum(AccountRole)
  role: AccountRole;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
