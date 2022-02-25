import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../tasks-status.enum';

//entities
import { User } from './../../auth/entities/user.entity';

/*
we can apply interceptors in handler level,controller level and application level
*/

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

  //stablish the relation connection with the users
  /* 
  
    ----> "eager:true" - when we are fetching the users from the database we
      also are getting the task with it, we don´t need to do it manualy
    
   */
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  //when ever we return json response, we exclude the user property
  @Exclude({ toPlainOnly: true })
  user: User;
}
