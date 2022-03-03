import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Interceptors
/* we can apply interceptors in handler level,controller level and application level*/
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

//console.log(process.env.MY_VARIABLE);

async function bootstrap() {
  //Implementing logging feature
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  //using the validation pipe in whole application
  app.useGlobalPipes(new ValidationPipe());
  //Running the interceptor at application level
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
