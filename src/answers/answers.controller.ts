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
import {Answer} from "./answer.entity";


@Controller('answers')
export class AnswersController {
  constructor(
      @InjectRepository(Answer)
      private readonly answersRepository : Repository<Answer>,
  ) {}

  //Read

  @Get('answers')
  async getAnswers(): Promise<Answer[]> {
    return await this.answersRepository.find();
  }

  @Get(':id')
  async getAnswer(@Param('id') id): Promise<Answer> {
    const answer = await this.answersRepository.findOne(id);
    if (!answer) {
      // Entity not found
      throw new NotFoundException();
    }
    return answer;
  }

  //Create

  @Post('answer')
  async createAnswer(@Body() answer: Partial<Answer>): Promise<Answer> {
    if (!answer) {
      throw new BadRequestException(`A Answer must have at least name and animalType defined`);
    }
    return await this.answersRepository.save(new Answer(answer));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateAnswer(@Param('id') id, @Body() answer: Partial<Answer>): Promise<void> {
    // Check if entity exists
    const exists = await this.answersRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.answersRepository.update(id, answer);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteAnswer(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.answersRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.answersRepository.delete(id);
  }
  
}
