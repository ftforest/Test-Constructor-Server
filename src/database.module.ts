import { Module } from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {User} from "./users/user.entity";
import {Question} from "./questions/question.entity";
import {Test} from "./tests/test.entity";
import {UserAnswer} from "./users-answers/user-answer.entity";
import {Answer} from "./answers/answer.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '',
            database: 'react_constr_tests',
            //entities: [__dirname + '/../dist/**/*.entity.{js}'],
            //entities: [__dirname + '/../src/**/*.entity.{ts,js}'],
            //entities: ["/**/*.entity{.ts,.js}"],
            //entities: ["./**/*.entity.ts"],
            entities: [User,Question,Test,UserAnswer,Answer],
            synchronize: false,
        }),
        /*TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get('database.host'),"database.host")
                return {
                    type: 'mysql',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    entities: [__dirname + '/src/!**!/!*.entity{.ts,.js}'],
                    synchronize: true
                }
            },
            inject: [ConfigService],
        }),*/
    ],
})
export class DatabaseModule {}
