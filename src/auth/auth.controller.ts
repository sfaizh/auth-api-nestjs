import { Body, Post, HttpCode, HttpStatus, Controller } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) { // TODO validation here using Dto class
        return this.authService.signIn(signInDto.username, signInDto.password)
    }
}