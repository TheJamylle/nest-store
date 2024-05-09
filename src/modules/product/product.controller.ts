import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
  async getAll() {
    return this.productService.listProducts();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }
}
