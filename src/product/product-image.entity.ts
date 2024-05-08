import { Column, Entity } from 'typeorm';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'description', nullable: false })
  description: string;
}
