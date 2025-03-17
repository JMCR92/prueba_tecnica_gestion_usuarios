import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  //create user using dto template
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.usersModel(createUserDto)

    return await newUser.save()
    .catch((err) => { //handle exception in case of a duplicate email
      const DUPLICATE_KEY_ERROR = 11000;
      if (err.code === DUPLICATE_KEY_ERROR) {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException(err.message)
    });
  }

  //find all users in DB
  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }

  //find user using id as filter
  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found'); //handle exception in case of a user not found
    }
    return user;
  }

  //find and update a user using id as a filter and using update DTO template
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersModel.findByIdAndUpdate(id, updateUserDto , {new: true});
    if (!user) {
      throw new NotFoundException('User not found'); //handle exception in case of a user not found
    }
    return user;
    
  }

  //find and delete a user using id as a filter
  async remove(id: string): Promise<User> {
    const delUser = await this.usersModel.findByIdAndDelete(id);
    if (!delUser) {
      throw new NotFoundException('User not found'); //handle exception in case of a user not found
    }
    return delUser;
  }
}
