import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() //create a user
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      "id": user._id,
      "name": user.name,
      "email": user.email,
      "createdAt": user.createdAt
    };
  }

  @Get() //get all users
  async getUsers()  {
    const users = await this.usersService.findAll();
    return users.map(user => {
      return {
        "id": user._id,
        "name": user.name,
        "email": user.email,
        "createdAt": user.createdAt
      }
    });
    
  }

  @Get(':id') //get a user by id
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      "id": user._id,
      "name": user.name,
      "email": user.email,
      "createdAt": user.createdAt
    };
  }

  @Put(':id') //update a user by id
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      "id": user._id,
      "name": user.name,
      "email": user.email,
      "createdAt": user.createdAt
    };
  }

  @Delete(':id') //delete a user by id
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return {
      "message": "User deleted successfully"
    }
  }

}
