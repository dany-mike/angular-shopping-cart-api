import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
      console.log(error);
      if (error.errno === 1062)
        throw new ConflictException('Username already exists');
      else {
        throw new InternalServerErrorException();
      }
    }
  }
}
