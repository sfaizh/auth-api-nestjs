import { LoggerMiddleware } from '@libs/logger/logger.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
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
