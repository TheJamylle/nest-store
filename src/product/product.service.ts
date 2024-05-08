import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dto/ListProducts.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.quantityAvailable = product.quantityAvailable;
    productEntity.category = product.category;
    productEntity.description = product.description;
    productEntity.userId = product.userId;
    productEntity.features = product.features;
    productEntity.images = product.images;

    return this.productRepository.save(product);
  }

  async listProducts() {
    return (await this.productRepository.find()).map(
      (product) => new ListProductsDTO(product.id, product.name, product.price),
    );
  }
}
