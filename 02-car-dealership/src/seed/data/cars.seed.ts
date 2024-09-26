import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';


export const CARS_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Hilux',
       },
       {
        id: uuid(),
        brand: 'Toyota',
        model: 'Avalon',
       },
       {
        id: uuid(),
        brand: 'Toyota',
        model: 'Supra',
       },
       {
        id: uuid(),
        brand: 'Toyota',
        model: 'Sienna',
       },
       {
        id: uuid(),
        brand: 'Toyota',
        model: 'Camry',
       }
];