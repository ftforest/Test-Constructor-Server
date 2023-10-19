import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserAnswersService} from "./user-answers.service";
import {UserAnswersController} from "./user-answers.controller";
import {UserAnswer} from "./user-answer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserAnswer])],
    providers: [UserAnswersService],
    controllers: [UserAnswersController],
})
export class UserAnswersModule {}