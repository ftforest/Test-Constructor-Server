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

import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserAnswer} from "./user-answer.entity";


@Controller('user-answer')
export class UserAnswersController {
  constructor(
      @InjectRepository(UserAnswer)
      private readonly completedTestsRepository : Repository<UserAnswer>,
  ) {}

  //Read

  @Get('user-answer')
  async getUserAnswers(): Promise<UserAnswer[]> {
    return await this.completedTestsRepository.find();
  }

  @Get(':id')
  async getUserAnswer(@Param('id') id): Promise<UserAnswer> {
    const user_answer = await this.completedTestsRepository.findOne(id);
    if (!user_answer) {
      // Entity not found
      throw new NotFoundException();
    }
    return user_answer;
  }

  //Create

  @Post('user-answer')
  async createUserAnswer(@Body() user_answer: Partial<UserAnswer>): Promise<UserAnswer> {
    if (!user_answer) {
      throw new BadRequestException(`A UserAnswer must have at least name and animalType defined`);
    }
    return await this.completedTestsRepository.save(new UserAnswer(user_answer));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateUserAnswer(@Param('id') id, @Body() user_answer: Partial<UserAnswer>): Promise<void> {
    // Check if entity exists
    const exists = await this.completedTestsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.completedTestsRepository.update(id, user_answer);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteUserAnswer(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.completedTestsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.completedTestsRepository.delete(id);
  }
  
}
