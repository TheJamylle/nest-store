import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'Password must have at least 6 length' })
  password: string;
}
