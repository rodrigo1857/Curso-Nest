import { Injectable } from '@nestjs/common';
import {ProductsService} from './../products/products.service'
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(private readonly productService:ProductsService){}

  async runSeed() {
    await this.insertNewProducts();
    return 'Return seed Execute';
  }

  private async insertNewProducts(){
      this.productService.deleteAllProduct();

      const products = initialData.products;

      const insertPromise =[];

      products.forEach(product =>{
        insertPromise.push(this.productService.create(product)) ;
      } );

      await Promise.all(insertPromise)
      return true;
  }

  
}
