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
import { ProductEntity } from '../product.entity';

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

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageDTO)
  images: ImageDTO[];
}

class FeatureDTO {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

class ImageDTO {
  id: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}
