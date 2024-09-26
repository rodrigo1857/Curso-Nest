import { Injectable, NotFoundException,BadRequestException  } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid } from 'uuid';
import { CreateCarDto,UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars:Car[] =  [
        {
          id: uuid(),
          brand: 'Mercedes',
          model: 'GLA',  
        },
        {
          id: uuid(),
          brand: 'Toyota',
          model: 'GLB',  
        },
        {
          id: uuid(),
          brand: 'Ferrari',
          model: 'GLC',  
        },
        {
          id: uuid(),
          brand: 'Ford',
          model: 'GLE',  
        },
        {
          id: uuid(),
          brand: 'Nissan',
          model: 'GLS',  
        },
        {
          id: uuid(),
          brand: 'Kia',
          model: 'A-Class',}
    ]; 
    
public getAllCars(){
    return this.cars;
}

public getCarById(id: string){
    const car = this.cars.find((car) => car.id === id);
     if(!car) throw new NotFoundException('Car not found');
    return car;
}

public CreateCar(createCarDto: CreateCarDto){
   
  const car: Car = {
      //operador spread 
      id: uuid(),
      ... createCarDto
  }
  
  this.cars.push(car);
    return car; 

}
 public update(id: string, updateCarDto: UpdateCarDto){
    let cardb = this.getCarById(id);
    if( updateCarDto.id && updateCarDto.id !== id )
      throw new BadRequestException(`Car id is not valid inside body`);
    this.cars = this.cars.map((car) => {
      if(car.id === id){
        cardb = {...cardb, ...updateCarDto,id};
        console.log(cardb);
        return cardb;
      }

      return car;
    })
    // car.brand = updateCarDto.brand;
    // car.model = updateCarDto.model;
    return cardb;
  }
  delete( id: string ) {
    //const car = this.getCarById( id );
    this.cars = this.cars.filter( car => car.id !== id );
    
}

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }

}