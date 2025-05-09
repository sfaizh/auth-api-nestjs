import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, ListAllEntities } from './dto'
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
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    const userToSave = {
      ...createUserDto,
      roles: createUserDto.roles ?? ['user'],
      password: hashedPassword
    }

    const newUser = await this.userService.create(userToSave)
    const { password, ...cleanedUser } = newUser

    return cleanedUser
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(): User[] {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') name: string) {
    return this.userService.findOne(name)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return id
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return id
  }
}
