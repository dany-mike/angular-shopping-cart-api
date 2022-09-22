import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto, RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import RolesGuard, { Roles } from './guards/roles.guard';
import { Role } from './enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.signUp(registerDto);
  }

  @Post('createAdmin')
  // @UseGuards(RolesGuard(Role.SuperAdmin))
  @UseGuards(AuthGuard())
  createAdmin(@Body() registerAdminDto: RegisterAdminDto): Promise<User> {
    return this.authService.createAdmin(registerAdminDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDto);
  }

  @Put('')
  // @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUserInfo(updateUserDto);
  }

  @Put('/password')
  // @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Get('admin-users')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard(), RolesGuard)
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Get(':token')
  // @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getUserByToken(@Param('token') token: string) {
    return this.authService.getUserByToken(token);
  }

  @Get('user/:id')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard(), RolesGuard)
  getUserById(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Post('/reset-password')
  resetPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Query('token') token,
  ): Promise<User> {
    return this.authService.resetPassword(resetPassword, token);
  }
}
