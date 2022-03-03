import { EntityRepository, Repository } from 'typeorm';

//entities
import { Task } from '../entities/task.entity';
import { User } from '../../auth/entities/user.entity';

//Enums
import { TaskStatus } from '../tasks-status.enum';

//DTOs
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-task-filter.dto';

//Logger
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  //implementing a logger
  //second parameter is timestamp enabling
  private logger = new Logger('TaskRepository', { timestamp: true });

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    //refering to the entity
    const query = this.createQueryBuilder('task');
    /* filter the task that belongs to the logged user */
    query.where({ user });

    //if the user provide the 'status' filter
    if (status) {
      //:statusInput is the variable into our query
      query.andWhere('task.status= :statusInput', { statusInput: status });
    }
    //if the user provide the 'search' filter
    if (search) {
      // wrapping the whole query will fix the search issue
      // when we filtering we are showing all the tasks from the database
      // and not only the tasks that belongs to the current logged user
      query.andWhere(
        ' ( LOWER (task.title) LIKE LOWER (:searchInput) OR LOWER (task.description) LIKE LOWER (:searchInput) )',
        { searchInput: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      //the stack is the error that comes from the database!!
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". FILTERS: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
