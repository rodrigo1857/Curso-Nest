import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protecte.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {


  constructor(
    private readonly reflector: Reflector,
  ) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles:string = this.reflector.get(META_ROLES,context.getHandler());

    if(!validRoles) return true ; 
    if(validRoles.length ===0 ) return true

    const req = context.switchToHttp().getRequest();
    const user = req.user as User; 

    if(!user) throw new BadRequestException

      for(const role of user.roles){
        if(validRoles.includes(role))
          return true
      }

    return true;
  }
}
