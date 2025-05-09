import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'
import { Role } from '@src/auth/decorators/role.enum';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'jdoe',
      password: 'changeme',
      name: 'john',
      email: 'jdoe@example.com',
      roles: [Role.User]
    },
    {
      userId: 2,
      username: 'mstein',
      password: 'guess',
      name: 'marie',
      email: 'mstein@example.com',
      roles: [Role.Admin]
    },
  ];

  create(user: User) {
    this.users.push(user)
  }

  findAll(): User[] {
    return this.users
  }

  findOne(username: string): User {
    const user = this.users.find(user => user.username === username)
    if (!user) {
      throw new Error(`User not found`)
    }
    return user
  }
  findOneId(userId: number): User {
    const user = this.users.find(user => user.userId === userId)
    if (!user) {
      throw new Error(`User not found`)
    }
    return user
  }
}