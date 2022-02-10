import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';
export class GetTasksFilterDto {
  //if the values comes, it must to be TaskStatus Type
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  //just to validate if the value comes, it must to be string
  @IsOptional()
  @IsString()
  search: string;
}
