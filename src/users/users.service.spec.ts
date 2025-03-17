//unit tests for user services

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUser = { //mock user with dummy data for testing
  _id: '1',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password',
  createdAt: '2021-01-01T00:00:00.000Z',
};

const mockUserModel = jest.fn().mockImplementation(() => ({
  save: jest.fn().mockResolvedValue(mockUser),
}));

Object.assign(mockUserModel, { //assign mock functions with dummy data for tests
  create: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockResolvedValue([mockUser]),
  findById: jest.fn().mockResolvedValue(mockUser),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
});

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ //specifies users.service and mocks user model for tests
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  //tests
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = { name: 'Test User', email: 'test@example.com', password: 'password' };
    const result = await service.create(createUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should return a user by ID', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user not found', async () => {
    jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
    const result = await service.update('1', updateUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user to update not found', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
    const updateUserDto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
    await expect(service.update('1', updateUserDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a user', async () => {
    const result = await service.remove('1');
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user to delete not found', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(null);
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});