import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, ListAllEntities } from './dto'
import { User } from './interfaces/user.interface'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto)
    return createUserDto
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id
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
