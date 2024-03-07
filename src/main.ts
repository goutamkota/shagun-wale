import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as express from "express";

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.enableCors();
  app.use(express.json());
  const port = process.env.PORT || 5342;
  await app.listen(port);
}

bootstrap().then(r => {
});
