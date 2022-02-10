import { EntityRepository, Repository } from 'typeorm';

//entities
import { Task } from '../entities/task.entity';

import { TaskStatus } from '../tasks-status.enum';

//DTOs
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-task-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    //refering to the entity
    const query = this.createQueryBuilder('task');
    //if the user provide the 'status' filter
    if (status) {
      //:statusInput is the variable into our query
      query.andWhere('task.status= :statusInput', { statusInput: status });
    }
    //if the user provide the 'search' filter
    if (search) {
      query.andWhere(
        ' LOWER (task.title) LIKE LOWER (:searchInput) OR LOWER (task.description) LIKE LOWER (:searchInput)',
        { searchInput: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
