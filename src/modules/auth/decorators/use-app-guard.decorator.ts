import { UseGuards } from '@nestjs/common';
import { RolesAuthGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const UseAppGuard = () => UseGuards(JwtAuthGuard, RolesAuthGuard);
