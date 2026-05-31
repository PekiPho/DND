import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: any) {
        return this.authService.login(req.user.id, req.user.username);
    }
}
