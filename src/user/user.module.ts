import { LoggerMiddleware } from '@libs/logger/logger.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from '@src/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@src/user/user.entity'

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([User])],
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
