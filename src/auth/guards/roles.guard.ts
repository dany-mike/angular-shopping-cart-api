import { Role } from '../enums/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

const RolesGuard = (r: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user?.role.includes(r);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RolesGuard;
