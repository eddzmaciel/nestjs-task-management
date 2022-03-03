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
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // Creating a instance of the logger
  // assigning the context, in this way we are going to know where this log is coming from
  private logger = new Logger('TaskController', { timestamp: true });
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    /* to be sure that we are retrieving  only the tasks 
       that belongs to the logged user 
    */
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks, FILTERS: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    //with this created Decorator we are getting access to our entire user
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task, DATA: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto, //previous creted Status Type
    //with this created Decorator we are getting access to our entire user
    @GetUser() user: User,
  ): Promise<Task> {
    //here we are sure that we are passing the validation in the DTO
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
