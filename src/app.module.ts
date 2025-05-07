import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from '@libs/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
    imports: [UserModule,
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'root',
        //     password: 'root',
        //     database: 'test',
        //     entities: [],
        //     synchronize: true,
        // }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    // constructor(private dataSource: DataSource) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')
    }
}