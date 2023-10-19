import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    generateToken(payload: any): string {
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): any {
        return this.jwtService.verify(token);
    }

    validateUser(email: string, password: string): any {
        return this.usersService.findByEmail(email);
    }
}
