import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'jdoe',
      password: 'changeme',
      name: 'john',
      email: 'jdoe@example.com',
      roles: ['user']
    },
    {
      userId: 2,
      username: 'mstein',
      password: 'guess',
      name: 'marie',
      email: 'mstein@example.com',
      roles: ['admin']
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
      throw new Error(`User with name ${name} not found`)
    }
    return user
  }
}