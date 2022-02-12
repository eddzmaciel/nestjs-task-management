import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//TypeORM
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    //Database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      //will automatically load existing entities
      //how to translate to db tables in schemas
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
