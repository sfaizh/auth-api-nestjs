import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username)
        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }
        const payload = { sub: user.userId, username: user.username }
        // const { password, ...result } = user
        // Generate JWT instead of user object
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async getCurrentUser(token: string) {
        try {
            const payload = await this.jwtService.verifyAsync(token)
            return this.usersService.findOneId(payload.sub)
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token')
        }
    }
}
