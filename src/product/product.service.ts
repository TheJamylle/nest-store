import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dto/ListProducts.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity) {
    return this.productRepository.save(product);
  }

  async listProducts() {
    return (await this.productRepository.find()).map(
      (product) => new ListProductsDTO(product.id, product.name, product.price),
    );
  }
}
