import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  @EmailIsUnique({ message: 'Email already registered' })
  email: string;

  @MinLength(6, { message: 'Password must have at least 6 length' })
  password: string;

  @IsNotEmpty()
  address: string;
}
