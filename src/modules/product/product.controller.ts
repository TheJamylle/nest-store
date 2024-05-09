import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(
    private productRepository: ProductRepository,
    private productService: ProductService,
  ) {}

  @Post()
  async create(@Body() product: CreateProductDTO) {
    const result = await this.productService.create(product);
    return { message: 'OK', product: result };
  }

  @Get()
  async list() {
    return this.productService.listProducts();
  }
}
