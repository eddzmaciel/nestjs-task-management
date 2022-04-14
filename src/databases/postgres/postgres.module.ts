import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
