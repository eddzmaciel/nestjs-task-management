import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//TypeORM
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    /* 
     ## Asyncronous module initialization
     ## Database connection ##
      wait till the config module is ready with the values 
    */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      /*  "inject[ ]" indicates what services from "ConfigModule" 
        you are going  to inject to the "useFactory" function */
      inject: [ConfigService],
      /* 
        - with "useFactory"  we can stablish a specific process and 
        - what this returns will be our configuration,
        - you can do depencency injection here
      */
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        // "autoLoadEntities" will automatically load existing entities
        autoLoadEntities: true,
        // "synchronize" is how to translate to db tables in schemas
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      }),
    }),
    /*
      ## Syncronous module initialization
      ## Database connection ##
   */
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'task-management',
    //   //will automatically load existing entities
    //   //how to translate to db tables in schemas
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

    AuthModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
