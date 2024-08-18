import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BransModule } from './brans/brans.module';


@Module({
  imports: [CarsModule, BransModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
