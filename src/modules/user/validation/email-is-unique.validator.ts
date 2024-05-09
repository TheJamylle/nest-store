import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: any): Promise<boolean> {
    const userExists = await this.userRepository.emailAlreadyRegistered(value);

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
