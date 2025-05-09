import { Body, Get, Post, HttpCode, HttpStatus, Controller, UseGuards, Request, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@src/auth/auth.guard'
import { AuthService } from '@src/auth/auth.service'
import { UserService } from '@src/user/user.service'
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) { // TODO validation here using Dto class
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @Post('refresh')
    async refresh(@Body() body: { userId: number, refresh_token: string }) {
        const user = await this.userService.findOneId(body.userId);
        if (!user || !user.refreshToken) throw new UnauthorizedException

        const isMatch = await bcrypt.compare(body.refresh_token, user.refreshToken);
        if (!isMatch) throw new UnauthorizedException

        const payload = { sub: user.userId, username: user.username, roles: user.roles };
        const access_token = await this.jwtService.signAsync(payload, { expiresIn: '60s' });

        return { access_token };
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        await this.userService.update(req.user.userId, { refreshToken: undefined });
        return { message: 'Logged out' };
    }

    // Can auth routes now
    @UseGuards(AuthGuard)
    @Get('current')
    getCurrentUser(@Request() req) {
        return req.user
    }
}