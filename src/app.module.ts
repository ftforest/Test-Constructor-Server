import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./users/user.entity";
import {UsersModule} from "./users/users.module";
import {Test} from "./tests/test.entity";
import {TestsModule} from "./tests/tests.module";
import {Question} from "./questions/question.entity";
import {Answer} from "./answers/answer.entity";
import {CompletedTest} from "./completed-tests/completed-test.entity";
import {QuestionsModule} from "./questions/questions.module";
import {AnswersModule} from "./answers/answers.module";
import {CompletedTestsModule} from "./completed-tests/completed-tests.module";
import {UserAnswer} from "./users-answers/user-answer.entity";
import {UserAnswersModule} from "./users-answers/user-answers.module";
import {DatabaseModule} from "./database.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        DatabaseModule,AuthModule,
        UsersModule,TestsModule,QuestionsModule,
        AnswersModule,CompletedTestsModule,UserAnswersModule
    ]
})

export class AppModule { }