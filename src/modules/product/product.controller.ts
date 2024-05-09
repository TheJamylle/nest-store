import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
import { ProductEntity } from './product.entity';

@Controller('/products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async create(@Body() product: CreateProductDTO) {
    const result = await this.productService.create(product);
    return { message: 'OK', product: result };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    return this.productService.listProducts();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    let product = await this.cacheManager.get<ProductEntity>(`product-${id}`);

    if (!product) {
      product = await this.productService.getById(id);

      await this.cacheManager.set(`product-${id}`, product);
    }
    return { message: 'OK', product };
  }
}
