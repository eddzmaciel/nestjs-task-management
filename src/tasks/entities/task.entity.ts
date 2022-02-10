import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../tasks-status.enum';

@Entity()
export class Task {
  //autogenerate the ID for our tasks and defined as primary
  //using uuid for generate a more unique value
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
