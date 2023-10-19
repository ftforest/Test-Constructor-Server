import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {UserAnswer} from "./user-answer.entity";

@Injectable()
export class UserAnswersService {
  constructor(
      @InjectRepository(UserAnswer)
      private UserAnswer: Repository<UserAnswer>,
  ) {}

  findAll(): Promise<UserAnswer[]> {
    return this.UserAnswer.find();
  }

  findOne(id: number): Promise<UserAnswer> {
    return this.UserAnswer.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.UserAnswer.delete(id);
  }

}