import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_secret_key',
        });
    }

    async validate(payload: any): Promise<any> {
        // В этом методе вы можете выполнить проверку пользователя по ID или другим данным в пейлоаде токена
        // и вернуть пользователя, если он действительный
        // Например, можно использовать сервис пользователя для поиска и верификации пользователя

        // const user = await this.userService.findUserById(payload.sub);
        // if (!user) {
        //   throw new UnauthorizedException();
        // }
        // return user;

        // В данном примере просто возвращаем пейлоад токена
        return payload;
    }
}