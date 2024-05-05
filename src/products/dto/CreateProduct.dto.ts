import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a decimal' })
  @IsPositive()
  price: number;

  @IsNumber()
  qtyAvailable: number;

  @IsNotEmpty()
  @Length(1, 1000)
  description: string;

  @IsNotEmpty()
  category: string;

  @ArrayNotEmpty()
  @ArrayMinSize(3)
  @ValidateNested({ each: true, always: true })
  @IsArray()
  @Type(() => FeatureDTO)
  features: FeatureDTO[];
}

class FeatureDTO {
  nome: string;
  descricao: string;
}
