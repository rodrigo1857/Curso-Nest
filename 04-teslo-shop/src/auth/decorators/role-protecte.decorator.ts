import { SetMetadata } from '@nestjs/common';
import { validRoles } from '../interface';

export const RoleProtected = (...args: validRoles[]) => SetMetadata('META_ROLES', args);
