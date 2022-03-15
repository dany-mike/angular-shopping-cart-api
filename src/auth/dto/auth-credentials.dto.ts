import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is to weak: must have 1 upper case letter, 1 lower case letter, 1 number or special character',
  })
  password: string;
}
