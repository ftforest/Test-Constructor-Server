import {NestApplicationContext, NestFactory} from '@nestjs/core';
import {AppModule} from "./app.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {DatabaseModule} from "./database.module";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Укажите здесь свой домен или порт клиента
    optionsSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  await app.listen(3001);
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();
