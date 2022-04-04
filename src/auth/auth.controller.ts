import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.signUp(registerDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDto);
  }
}
