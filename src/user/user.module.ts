import { LoggerMiddleware } from '@libs/logger/logger.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthGuard } from '@src/auth/auth.guard'
import { AuthModule } from '@src/auth/auth.module'
import { UserCoreModule } from '@src/user/user.core.module'

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('user')
    }
}
