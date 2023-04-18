import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RestaurantService, PrismaService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
