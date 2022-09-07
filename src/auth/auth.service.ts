import {
  BadRequestException,
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
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { randomBytes } from 'crypto';
import { IResetObject } from './interfaces/resetObject.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService, // private emailService: EmailService,
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

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    delete user.password;
    return user;
  }

  async updateUserInfo(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password, newEmail } = updateUserDto;

    const user = await this.usersRepository.findOne({ email });

    if (user.email !== newEmail) {
      const emailExist = await this.usersRepository.findOne({
        where: { email: newEmail },
      });

      if (emailExist) {
        throw new BadRequestException('New email already already exist');
      }
    }

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

  async saveResetToken(user: User): Promise<IResetObject> {
    const token = await this.generateToken();
    this.usersRepository.saveResetToken(token, user);
    const resetLink = `${process.env.FRONT_END_BASE_URL}/auth/reset?token=${token}`;

    const res: IResetObject = {
      token,
      resetLink,
    };

    return res;
  }

  async generateToken() {
    return randomBytes(64).toString('hex');
  }

  async findUserByEmail(email): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    return user;
  }

  async findUserByResetToken(resetToken: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { resetToken },
    });

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    return user;
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    resetToken: string,
  ): Promise<User> {
    const { password, confirmPassword } = resetPasswordDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('The 2 passwords must be same');
    }

    const user = await this.findUserByResetToken(resetToken);

    return await this.usersRepository.resetPassword(user, password);
  }
}
