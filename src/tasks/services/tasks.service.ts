import { Injectable, NotFoundException } from '@nestjs/common';

//import { v4 as uuid } from 'uuid';

//Interfacess
import { TaskStatus } from '../tasks-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-task-filter.dto';

//Repositories
import { TasksRepository } from '../repositories/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    //how to inject a Repository
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
    return found;
  }

  //#### Local memory version

  // private tasksData: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasksData;
  // }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   //### take a look on this
  //   const { status, search } = filterDto;
  //   //define a temporary array to hold the result
  //   let tasks = this.getAllTasks();
  //   //do something with status filter
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   //do something with search and filter all the elements that comes with the "search" word
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   //do something with return final result
  //   return tasks;
  // }

  // getTaskById(id: string): Task {
  //   //try to get task
  //   //if not found, throw an error (404 not found)
  //   // otherwise, return the found task
  //   const found = this.tasksData.find((task) => task.id === id);
  //   if (!found) {
  //     //throwing a prestablished exceptions
  //     throw new NotFoundException(`Task with ID "${id}" not found!`);
  //   }
  //   return found;
  // }

  // createTask(
  //   /*title: string, description: string*/
  //   createTaskDto: CreateTaskDto,
  // ): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasksData.push(task);
  //   return task;
  // }
  // deleteTask(id: string) {
  //   const found = this.getTaskById(id);
  //   this.tasksData = this.tasksData.filter((task) => task.id !== found.id);
  //   console.log('---> newTasks:', this.tasksData);
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
