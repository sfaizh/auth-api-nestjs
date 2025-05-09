import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@src/user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string, refresh_token: string }> {
        const user = await this.usersService.findOne(username)
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException()
        }
        const payload = { sub: user.userId, username: user.username, roles: user.roles }
        // const { password, ...result } = user
        // Generate JWT instead of user object
        const access_token = await this.jwtService.signAsync(payload)
        const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' })

        const hashedRefresh = await bcrypt.hash(refresh_token, 10);
        await this.usersService.update(user.userId, { refreshToken: hashedRefresh })

        return { access_token, refresh_token }
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
