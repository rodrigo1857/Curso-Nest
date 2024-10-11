import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interface';
import { User } from 'src/auth/entities/user.entity';


@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @Auth()
  create(@Body() createProductDto: CreateProductDto,
    @GetUser() user:User) { 
    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    console.log(paginationDTO);// Debe retornar el objeto con los valores de limit y offset
     return this.productsService.findAll(paginationDTO);
  }

  @Get(':term')
  async findOne(@Param('term') term: string) {
    return this.productsService.finOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto,@GetUser() user:User) {
    console.log(updateProductDto);
    return this.productsService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
  
}
