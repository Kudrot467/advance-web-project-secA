import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trip Nest')
    .setDescription('Midterm projects for Advance Web Tech')
    .setVersion('1.0')
    .addTag('Submitted to Al-Amin Sir')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3001'
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
