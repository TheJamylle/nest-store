import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { v4 as uuid } from 'uuid';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async create(@Body() product: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.quantity = product.quantity;
    productEntity.category = product.category;
    productEntity.description = product.description;
    productEntity.userId = product.userId;
    productEntity.id = uuid();

    this.productRepository.save(productEntity);
    return { id: productEntity.id, message: 'OK' };
  }

  @Get()
  async list() {
    return this.productRepository.getAll();
  }
}
