import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {AuthController} from "./auth.controller";
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UsersService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}