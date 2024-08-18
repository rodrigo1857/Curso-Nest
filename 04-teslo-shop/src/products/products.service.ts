import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      // if(!createProductDto.slug){
      //   createProductDto.slug = createProductDto.title.toLocaleLowerCase().replaceAll(' ','_').replaceAll("'","")
      // }else{
      //   createProductDto.slug = createProductDto.slug.toLocaleLowerCase().replaceAll(' ','_').replaceAll("'","")
      // }
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDTO) {

    const { limit = 10, offset = 0 } = paginationDto
    return this.productRepository.find({
      take: limit,
      skip: offset

    });
  }

  async findOne(term: string): Promise<Product> {

    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('LOWER(title) =:title or slug = :slug', {
          title: term.toLocaleLowerCase(),
          slug: term,
        }).getOne();
    }

    if (!product)
      throw new NotFoundException(`Productor with id ${term} not found`)
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    });
    if (!product) throw new NotFoundException(`No se encontro el producto`);

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }
}
