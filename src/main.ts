import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Simple Auth API')
    .setDescription('API สำหรับ login/register และ employees')
    .setVersion('1.0')
    .addBearerAuth() // ให้สามารถกรอก JWT token ใน Swagger
    .build();

  app.enableCors({
    origin: 'http://localhost:3001', // หรือ '*' สำหรับอนุญาตทุก origin (ใช้เฉพาะตอน dev)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api`);
}
bootstrap();
