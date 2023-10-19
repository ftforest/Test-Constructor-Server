import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
    @Get()
    @UseGuards(JwtAuthGuard)
    protectedRoute() {
        // Этот код будет выполнен только если токен авторизации валидный
        return 'Protected Route';
    }
}