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
import {Question} from "./question.entity";


@Controller('questions')
export class QuestionsController {
  constructor(
      @InjectRepository(Question)
      private readonly questionsRepository : Repository<Question>,
  ) {}

  //Read

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
    return await this.questionsRepository.find();
  }

  @Get(':id')
  async getQuestion(@Param('id') id): Promise<Question> {
    const question = await this.questionsRepository.findOne(id);
    if (!question) {
      // Entity not found
      throw new NotFoundException();
    }
    return question;
  }

  //Create

  @Post('question')
  async createQuestion(@Body() question: Partial<Question>): Promise<Question> {
    if (!question) {
      throw new BadRequestException(`A Question must have at least name and animalType defined`);
    }
    return await this.questionsRepository.save(new Question(question));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateQuestion(@Param('id') id, @Body() question: Partial<Question>): Promise<void> {
    // Check if entity exists
    const exists = await this.questionsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.questionsRepository.update(id, question);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteQuestion(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.questionsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.questionsRepository.delete(id);
  }
  
}
