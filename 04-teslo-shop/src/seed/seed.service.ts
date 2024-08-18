import { Injectable } from '@nestjs/common';
import {ProductsService} from './../products/products.service'

@Injectable()
export class SeedService {

  constructor(private readonly productService:ProductsService){}

  async runSeed() {
    await this.insertNewProducts();
    return 'Return seed Execute';
  }

  private async insertNewProducts(){
      this.productService.deleteAllProduct();
      return true;
  }

}
