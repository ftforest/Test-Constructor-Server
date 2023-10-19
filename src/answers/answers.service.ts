import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {Answer} from "./answer.entity";

@Injectable()
export class AnswersService {
  constructor(
      @InjectRepository(Answer)
      private answer: Repository<Answer>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answer.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answer.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.answer.delete(id);
  }

}