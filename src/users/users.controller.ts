import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Put,
  HttpCode, Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./create-user.dto";
import {ObjectId, Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Controller('users')
export class UsersController {
  constructor(
      @InjectRepository(User)
      private readonly usersRepository : Repository<User>,
  ) {}

  //Read

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  @Get(':id')
  async getUser(@Param('id') id): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      // Entity not found
      throw new NotFoundException();
    }
    return user;
  }

  //Create

  @Post('user')
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.firstName || !user.lastName || !user.password || !user.email) {
      throw new BadRequestException(`A User must have at least name and animalType defined`);
    }
    return await this.usersRepository.save(new User(user));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id, @Body() user: Partial<User>): Promise<void> {
    // Check if entity exists
    const exists = await this.usersRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.usersRepository.update(id, user);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.usersRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.usersRepository.delete(id);
  }

  @Post('/api/users/registration')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('/api/users/registration',createUserDto.email);

    return JSON.stringify({
      status:"create",
      email: createUserDto.email,
      password: createUserDto.password
    });
  }
}
