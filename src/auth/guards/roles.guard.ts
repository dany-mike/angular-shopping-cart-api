import { Role } from '../enums/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

const RolesGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      console.log(user);

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RolesGuard;
