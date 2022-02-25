import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

//Services
import { TasksService } from './services/tasks.service';

//Interfaces
import { TaskStatus } from './tasks-status.enum';
import { title } from 'process';

//DTOs
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

//Entities
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';

//Custom Decorators
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    //with this created Decorator we are getting access to our entire user
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto, //previous creted Status Type
  ): Promise<Task> {
    //here we are sure that we are passing the validation in the DTO
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    /* to be sure that we are retrieving  only the tasks 
       that belongs to the logged user 
    */
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
}
