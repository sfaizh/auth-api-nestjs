import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
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
            throw new Error('User not found');
        }
        return matchRoles(roles, user.roles)
    }
}