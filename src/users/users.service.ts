import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      lastname: 'Doe',
      firstname: 'John',
      email: 'john@doe.com',
      password: 'changeme',
    },
    {
      id: 2,
      lastname: 'Gonzalez',
      firstname: 'Maria',
      email: 'maria@gonzalez.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
