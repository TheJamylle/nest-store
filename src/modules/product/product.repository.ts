import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async getAll() {
    return this.products;
  }
}
