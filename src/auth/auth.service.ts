import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }
        const { password, ...result } = user
        // Generate JWT instead of user object
        return result
    }
}
