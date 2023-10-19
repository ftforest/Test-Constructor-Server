import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: any) {
        // Здесь вы можете выполнить проверку учетных данных пользователя,
        // например, сравнение пароля с хэшем в базе данных
        // Если учетные данные верны, сгенерируйте токен и верните его клиенту

        console.log(credentials,"credentials");
        //return credentials.email;
        const user = await this.authService.validateUser(credentials.email, credentials.password);
        if (user) {
            const token = this.authService.generateToken({ sub: user.id, username: user.email });
            return { token };
        } else {
            // Если учетные данные неверны, верните ошибку аутентификации
            return { error: 'Authentication failed' };
        }
    }
}