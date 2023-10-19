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
import {CompletedTest} from "./completed-test.entity";


@Controller('completed_tests')
export class CompletedTestsController {
  constructor(
      @InjectRepository(CompletedTest)
      private readonly completedTestsRepository : Repository<CompletedTest>,
  ) {}

  //Read

  @Get('completed_tests')
  async getCompletedTests(): Promise<CompletedTest[]> {
    return await this.completedTestsRepository.find();
  }

  @Get(':id')
  async getCompletedTest(@Param('id') id): Promise<CompletedTest> {
    const completed_test = await this.completedTestsRepository.findOne(id);
    if (!completed_test) {
      // Entity not found
      throw new NotFoundException();
    }
    return completed_test;
  }

  //Create

  @Post('completed_test')
  async createCompletedTest(@Body() completed_test: Partial<CompletedTest>): Promise<CompletedTest> {
    if (!completed_test) {
      throw new BadRequestException(`A CompletedTest must have at least name and animalType defined`);
    }
    return await this.completedTestsRepository.save(new CompletedTest(completed_test));
  }

  //Update

  @Put(':id')
  @HttpCode(204)
  async updateCompletedTest(@Param('id') id, @Body() completed_test: Partial<CompletedTest>): Promise<void> {
    // Check if entity exists
    const exists = await this.completedTestsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.completedTestsRepository.update(id, completed_test);
  }

  //Delete

  @Delete(':id')
  @HttpCode(204)
  async deleteCompletedTest(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = await this.completedTestsRepository.findOne(id);
    if (!exists) {
      throw new NotFoundException();
    }
    await this.completedTestsRepository.delete(id);
  }
  
}
