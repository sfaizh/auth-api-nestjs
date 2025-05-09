import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(req)
        if (!token) {
            throw new UnauthorizedException
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get('JWT_SECRET')
                }
            )
            req['user'] = payload

            console.log('AuthGuard → req.user set to:', payload);
        } catch {
            throw new UnauthorizedException
        }
        return true
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}