import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Custom modules
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

//DB Modules
import { MongodbModule } from './databases/mongodb/mongodb.module';
import { PostgresModule } from './databases/postgres/postgres.module';

//Schema  validators
import { configValidationSchema } from './config.schema';

// here we define the stage environment
//  "start:dev": "cross-env STAGE=dev nest start --watch",
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      /* "validationSchema: configValidationSchema,"
      is for validate the minimal variables for inialize the APPLICATION */
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    AuthModule,
    // PostgresDb connection
    PostgresModule,
    MongodbModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
