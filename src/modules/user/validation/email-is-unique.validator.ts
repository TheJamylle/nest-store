import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    const userExists = await this.userService.emailAlreadyRegistered(value);

    return !userExists;
  }
}

export const EmailIsUnique = (options: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
