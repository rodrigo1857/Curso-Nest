import { Injectable } from '@nestjs/common';
import {ProductsService} from './../products/products.service'
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import *as bcrypt from 'bcrypt'
@Injectable()
export class SeedService {

  constructor(
    private readonly productService:ProductsService,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ){}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertNewUsers();    
    await this.insertNewProducts(adminUser);
    return 'Return seed Execute';
  }

  private async deleteTables(){
    await this.productService.deleteAllProduct();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
    .delete()
    .where({})
    .execute();
  }

  private async insertNewUsers(){
    const seedUsers = initialData.users;
    const users:User[] = []
    
    seedUsers.forEach(user =>{
      users.push(this.userRepository.create({
        ...user,password: bcrypt.hashSync(user.password,10)}));
      console.log(users);
    }); 

    await this.userRepository.save(users);
    return users[0];
  }


  private async insertNewProducts(user:User){
      this.productService.deleteAllProduct();

      const products = initialData.products;

      const insertPromise =[];

      products.forEach(product =>{
        insertPromise.push(this.productService.create(product,user)) ;
      } );

      await Promise.all(insertPromise)
      return true;
  }

  
}
