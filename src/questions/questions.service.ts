import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {Question} from "./question.entity";

@Injectable()
export class QuestionsService {
  constructor(
      @InjectRepository(Question)
      private question: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.question.find();
  }

  findOne(id: number): Promise<Question> {
    return this.question.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.question.delete(id);
  }

}