import { Module } from '@nestjs/common';
//Controllers
import { TasksController } from './tasks.controller';

//Services
import { TasksService } from './services/tasks.service';

//Modules
import { TypeOrmModule } from '@nestjs/typeorm';

//Respositories
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  imports: [
    //this is used for modules differents than app.module.ts file "forRoot()"
    TypeOrmModule.forFeature([TasksRepository]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
