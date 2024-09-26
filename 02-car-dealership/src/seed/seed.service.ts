import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,

  ) {}

  populeDB(){
    CARS_SEED
    BRANDS_SEED
    this.carsService.fillCarsWithSeedData(CARS_SEED)
    this.brandsService.fillCarsWithSeedData(BRANDS_SEED)
    return 'Executado exitosamente';
  }
}
