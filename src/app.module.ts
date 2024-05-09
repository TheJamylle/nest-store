import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { UserRepository } from './modules/user/user.repository';
import { UserExistsValidator } from './validation/user-exists.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './resources/filters/global-exception-filter';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    OrderModule,
    CacheModule.register({ isGlobal: true, ttl: 10000 }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    UserRepository,
    UserExistsValidator,
  ],
})
export class AppModule {}
