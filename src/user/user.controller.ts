import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, ListAllEntities } from './dto'
import { User } from './interfaces/user.interface'
import { Roles } from '@src/auth/decorators/roles.decorator'
import { AuthGuard } from '@src/auth/auth.guard'
import { Role } from '@src/auth/decorators/role.enum'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto)
    return createUserDto
  }

  @UseGuards(AuthGuard)
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
