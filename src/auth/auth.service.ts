import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAdminDto, RegisterDto } from './dtos/register.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginDto } from './dtos/login.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(registerDto: RegisterDto): Promise<void> {
    await this.usersRepository.createUser(registerDto);
  }

  async createAdmin(registerAdminDto: RegisterAdminDto): Promise<void> {
    await this.usersRepository.createAdminUser(registerAdminDto);
  }

  async getUserByid(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      const userResponse = {
        ...user,
        accessToken,
      };

      return userResponse;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
