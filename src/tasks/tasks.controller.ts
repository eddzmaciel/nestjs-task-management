import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TasksService } from './services/tasks.service';

//Interfaces
import { TaskStatus } from './tasks-status.enum';
import { title } from 'process';

//DTOs
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  //#### Local memory version
  // // 1. Stablish a valid status
  // // 2. stablish is not a empty parameter
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   //if we have any filters defined,
  //   //call tasksService.getTaskWithFilters, otherwise, just get all tasks
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(
  //   /*@Body('title') title, @Body('description') description*/
  //   @Body() createTaskDto: CreateTaskDto,
  // ) {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto, //previous creted Status Type
  // ): Task {
  //   //here we are sure that we are passing the validation in the DTO
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
