import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async create(@Body() product: CreateProductDTO) {
    this.productRepository.save(product);
    return product;
  }

  @Get()
  async list() {
    return this.productRepository.getAll();
  }
}
