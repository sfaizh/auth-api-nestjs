import { Body, Get, Post, HttpCode, HttpStatus, Controller, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@src/auth/auth.guard'
import { AuthService } from '@src/auth/auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) { // TODO validation here using Dto class
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    // Can auth routes now
    @UseGuards(AuthGuard)
    @Get('current')
    getProfile(@Request() req) {
        return req.user
    }
}