import { Controller, Body, Post, UseGuards, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto, RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import RolesGuard from './guards/roles.guard';
import { Role } from './enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.signUp(registerDto);
  }

  @Post('createAdmin')
  @UseGuards(RolesGuard(Role.SuperAdmin))
  @UseGuards(AuthGuard())
  createAdmin(@Body() registerAdminDto: RegisterAdminDto): Promise<void> {
    return this.authService.createAdmin(registerAdminDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDto);
  }

  @Get(':token')
  getUserByToken(@Param('token') token: string) {
    return this.authService.getUserByToken(token);
  }
}
