import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.dto';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
