import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
