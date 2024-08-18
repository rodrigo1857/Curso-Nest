import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto,UpdateCarDto } from './dto';



@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {
    
 constructor(private readonly carsService: CarsService){

 }
    @Get()
    getAllCars(){
       return this.carsService.getAllCars();
    }
    @Get(':id')
    getCardById(@Param('id',ParseUUIDPipe) id:string){
        console.log({id});
        console.log(this.carsService.getCarById(id));
        return this.carsService.getCarById(id);
    }

    @Post()
    createCar(@Body() createCardDto : CreateCarDto){
        return this.carsService.CreateCar(createCardDto);
    }

    @Patch(':id')
    updateCar( 
        @Param('id',ParseUUIDPipe) id:string,
        @Body() updateCarDto: UpdateCarDto){
             
        return this.carsService.update(id,updateCarDto )
       }

    @Delete(':id')
    deleteCar(@Param('id',ParseUUIDPipe) id:string){
        return this.carsService.delete(id);
    }
}
