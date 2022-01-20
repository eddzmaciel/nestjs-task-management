import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

//Interfacess
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasksData: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasksData;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //### take a look on this
    const { status, search } = filterDto;
    //define a temporary array to hold the result
    let tasks = this.getAllTasks();

    //do something with status filter
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    //do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    //do something with return final result

    return tasks;
  }

  getTaskById(id: string): Task {
    //try to get task
    //if not found, throw an error (404 not found)
    // otherwise, return the found task

    const found = this.tasksData.find((task) => task.id === id);

    if (!found) {
      //throwing a prestablished exceptions
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }

    return found;
  }

  createTask(
    /*title: string, description: string*/
    createTaskDto: CreateTaskDto,
  ): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasksData.push(task);
    return task;
  }

  deleteTask(id: string) {
    //const found = this.tasksData.find((task) => task.id === id);
    this.tasksData = this.tasksData.filter((task) => task.id !== id);
    console.log('---> newTasks:', this.tasksData);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
