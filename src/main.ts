import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Interceptors
/*
we can apply interceptors in handler level,controller level and application level
*/
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using the validation pipe in whole application
  app.useGlobalPipes(new ValidationPipe());
  //Running the interceptor at application level
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
