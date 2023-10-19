import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CompletedTestsService} from "./completed-tests.service";
import {CompletedTestsController} from "./completed-tests.controller";
import {CompletedTest} from "./completed-test.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CompletedTest])],
    providers: [CompletedTestsService],
    controllers: [CompletedTestsController],
})
export class CompletedTestsModule {}