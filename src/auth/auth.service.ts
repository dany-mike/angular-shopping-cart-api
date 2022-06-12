import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAdminDto, RegisterDto } from './dtos/register.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginDto } from './dtos/login.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

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

    delete user.password;

    return user;
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });

    const user = await this.usersRepository.findOne({
      where: { email: decoded.email },
    });
    delete user.password;
    return user;
  }

  async updateUserInfo(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password, newEmail } = updateUserDto;

    const isSameEmail = await this.usersRepository.findOne({
      where: { email: newEmail },
    });

    if (isSameEmail) {
      throw new BadGatewayException(`Email ${newEmail} already used`);
    }

    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.usersRepository.updateUser(user, updateUserDto);
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const { email, password } = updatePasswordDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.usersRepository.updatePassword(user, updatePasswordDto);
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      delete user.password;
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
