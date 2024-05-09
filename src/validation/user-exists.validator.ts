import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    const user = await this.userService.getById(value);
    return user != undefined;
  }
}

export const UserExists = (options: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options,
      constraints: [],
      validator: UserExistsValidator,
    });
  };
};
