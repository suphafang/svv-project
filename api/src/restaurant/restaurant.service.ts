import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll(): Promise<RestaurantDto[]> {
    return this.prisma.restaurant.findMany({
      where: {
        isOpen: true
      }
    });
  }

  async findOne(id: number): Promise<RestaurantDto> {
    const restaurant: RestaurantDto = await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
      include: {
        Menu: true
      }
    });

    if (!restaurant) throw new NotFoundException('restaurant not found');

    return restaurant;
  }
}
