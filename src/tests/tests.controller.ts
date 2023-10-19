import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  NotFoundException,
  BadRequestException,
  Put,
  HttpCode, Delete
} from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Test} from "./test.entity";


@Controller('tests')
export class TestsController {
  constructor(
      @InjectRepository(Test)
      private readonly testsRepository : Repository<Test>,
  ) {}

  //Read

  @Get('tests')
  @UseGuards(JwtAuthGuard)
  async getTests(): Promise<Test[]> {
    return await this.testsRepository.find();
  }

  @Get(':id')
  async getTest(@Param('id') id): Promise<Test> {
    const test = await this.testsRepository.findOne(id);
    if (!test) {
      // Entity not found
      throw new NotFoundException();
    }
    return test;
  }

  //Create

  @Post('test')
  async createTest(@Body() test: Partial<Test>): Promise<Test> {
    if (!test || !test.title || !test.author_id) {
      throw new BadRequestException(`A Test must have at least name and animalType defined`);
    }
    return await this.testsRepository.save(new Test(test));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateTest(@Param('id') id, @Body() test: Partial<Test>): Promise<void> {
    // Check if entity exists
    const exists = await this.testsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.testsRepository.update(id, test);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteTest(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.testsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.testsRepository.delete(id);
  }
  
}
