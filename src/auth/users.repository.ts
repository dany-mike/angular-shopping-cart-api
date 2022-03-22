import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    let hashedPassword: string;

    await bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        hashedPassword = hash;
      });
    });

    const user = this.create({
      username,
      password: hashedPassword,
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
