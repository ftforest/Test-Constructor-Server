import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {CompletedTest} from "./completed-test.entity";

@Injectable()
export class CompletedTestsService {
  constructor(
      @InjectRepository(CompletedTest)
      private Completed_Test: Repository<CompletedTest>,
  ) {}

  findAll(): Promise<CompletedTest[]> {
    return this.Completed_Test.find();
  }

  findOne(id: number): Promise<CompletedTest> {
    return this.Completed_Test.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.Completed_Test.delete(id);
  }

}