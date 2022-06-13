import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto, RegisterAdminDto } from './dtos/register.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(registerDto: RegisterDto): Promise<void> {
    const { email, password, firstname, lastname } = registerDto;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`Email: ${email} already exists`);
      else {
        throw new InternalServerErrorException();
      }
    }
  }
  async createAdminUser(registerAdminDto: RegisterAdminDto): Promise<void> {
    const { email, password, firstname, lastname, role } = registerAdminDto;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`Email: ${email} already exists`);
      else {
        throw new InternalServerErrorException();
      }
    }
  }
  updateUser = async (
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> => {
    const { newEmail, password, firstname, lastname } = updateUserDto;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return this.save({
      email: newEmail,
      password: hashedPassword,
      firstname,
      lastname,
      id: user.id,
    });
  };

  updatePassword = async (
    user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> => {
    const { newPassword } = updatePasswordDto;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return this.save({
      password: hashedPassword,
      id: user.id,
    });
  };
}
