import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createAt: new Date().getTime(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {  
      id: uuid(),
      ...createBrandDto,
      createAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand)=> brand.id === id);
    if(!brand)
      throw new NotFoundException(`brand with ${id} no encontrada`);
    return brand; 
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDb = this.findOne(id.toString());
    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDb.updateAt = new Date().getTime();
        brandDb = { ...brandDb, ...updateBrandDto };
        return brandDb;
      }
      return brand;
    });
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
