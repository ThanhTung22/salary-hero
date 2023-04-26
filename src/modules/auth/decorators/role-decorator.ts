import { SetMetadata } from '@nestjs/common';
import { AccountRole, ROLES_KEY } from '../auth.constant';

export const Roles = (...roles: AccountRole[]) => SetMetadata(ROLES_KEY, roles);
