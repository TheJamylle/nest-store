import { Column, Entity } from 'typeorm';

@Entity({ name: 'product_features' })
export class ProductFeatureEntity {
  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: false })
  description: string;
}
