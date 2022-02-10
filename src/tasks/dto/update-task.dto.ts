import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

// validates that tthe status is at least
// one of the properties that comes in
//status model
export class UpdateTaskStatusDto {
  //IF DOESN´T PASS THE VALIDATION WILL RETURN "MUST TO BE A VALID ENUM"
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
