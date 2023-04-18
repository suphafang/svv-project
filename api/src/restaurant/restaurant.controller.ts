import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService
  ) { }

  @Get()
  async findAll(): Promise<RestaurantDto[]> {
    return await this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<RestaurantDto> {
    return await this.restaurantService.findOne(parseInt(id));
  }
}
