import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { User } from './interfaces/user.interface'
import { Roles } from '@src/auth/decorators/roles.decorator'
import { AuthGuard } from '@src/auth/auth.guard'
import { Role } from '@src/auth/decorators/role.enum'
import * as bcrypt from 'bcrypt'
import { RolesGuard } from '@src/auth/roles.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(AuthGuard, RolesGuard) // AuthGuard attaches req object for use
  @Post('new')
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto): Promise<{hash}> {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    const userToSave = {
      ...createUserDto,
      roles: createUserDto.roles ?? ['user'],
      password: hashedPassword
    }

    await this.userService.create(userToSave)
    return {
      hash: hashedPassword.slice(0, 10)
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') name: string) {
    return this.userService.findOne(name)
  }

  @Put(':id')
  update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) userId: number) {
    await this.userService.remove(userId)
    return { message: 'User deleted' }
  }
}
