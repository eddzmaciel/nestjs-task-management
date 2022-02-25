import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//Entities
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //unique property
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // stablish a relationship with the Tasks Entity

  /* 
  
    ----> "eager:true" - when we are fetching the users from the database we
      also are getting the task with it, we don´t need to do it manualy
    
   */

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
