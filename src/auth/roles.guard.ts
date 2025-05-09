import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles, ROLES_KEY } from './decorators/roles.decorator'
import { Role } from '@src/auth/decorators/role.enum'

function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role))
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext
    ): boolean {
        // const roles = this.reflector.get<string[]>(Roles, context.getHandler())
        const roles = this.reflector.getAllAndOverride <Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!roles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const hasRole = matchRoles(roles, user.roles)
        if (!hasRole) {
            throw new ForbiddenException('You do not have permission to access this resource')
        }
        console.log('RolesGuard → req.user:', user);
        return hasRole
    }
}