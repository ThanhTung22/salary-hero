import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountRole } from '../auth.constant';

export class LoginDto {
  @ApiProperty({
    default: 'lethanhtung@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'Abc@12345',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  role: AccountRole;
}
