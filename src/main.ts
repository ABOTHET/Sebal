import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from "process"
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
async function bootstrap() {
  const PORT = env["PORT"] || 4932;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });
  /*app.use(compression);*/
  await app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}
bootstrap();
