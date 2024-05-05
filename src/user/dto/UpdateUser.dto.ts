import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  @EmailIsUnique({ message: 'Email already registered' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must have at least 6 length' })
  @IsOptional()
  password: string;
}
