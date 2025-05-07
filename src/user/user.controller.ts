import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return 'Creating a new user'
    }

    @Get()
    findAll(): string {
        return 'Returns all users'
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return `This action returns a #${id} user`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id} user`;
    }
}
