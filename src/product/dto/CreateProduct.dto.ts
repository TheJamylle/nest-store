import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a decimal' })
  @IsPositive()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @Length(1, 1000)
  description: string;

  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => FeatureDTO)
  features: FeatureDTO[];
}

class FeatureDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
