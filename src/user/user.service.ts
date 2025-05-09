import { Injectable } from '@nestjs/common'
import { Role } from '@src/auth/decorators/role.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@src/user/user.entity'
import { Repository, UpdateDateColumn } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from '@src/user/dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // private readonly users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'jdoe',
  //     password: 'changeme',
  //     name: 'john',
  //     email: 'jdoe@example.com',
  //     roles: [Role.User]
  //   },
  //   {
  //     userId: 2,
  //     username: 'mstein',
  //     password: 'guess',
  //     name: 'marie',
  //     email: 'mstein@example.com',
  //     roles: [Role.Admin]
  //   },
  // ]

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(userDto)
    return this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(username: string): Promise<User | null> {
    // const user = this.users.find(user => user.username === username)
    const user = await this.usersRepository.findOneBy({ username })
    if (!user) {
      throw new Error(`User not found`)
    }
    return user
  }

  async findOneId(userId: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ userId })
    if (!user) {
      throw new Error(`User not found`)
    }
    return user
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ userId })
    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = Object.assign(user, updateUserDto)
    return this.usersRepository.save(updatedUser)
  }

  async remove(userId: number): Promise<void> {
    const res = await this.usersRepository.delete(userId)
    if (res.affected === 0) {
      throw new Error('User not found')
    }
  }
}