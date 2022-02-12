import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredencialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  //using this regular expression for the password matching
  // and you can provide custom message
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must to contain at least 1 upper case letter, 1 lower case letter and at least 1 number or special character',
  })
  password: string;
}
