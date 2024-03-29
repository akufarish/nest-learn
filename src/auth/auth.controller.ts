import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.doLogin(dto);
  }

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.doRegister(dto);
  }
}
