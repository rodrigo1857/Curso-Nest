import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,


    private readonly dataSource: DataSource,


  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetail } = createProductDto;
      // metodo de destructuracion y agregar imagenes 
      const product = this.productRepository.create({
        ...productDetail,
        images: images.map(image => this.productImageRepository.create({ url: image }))
      });
      await this.productRepository.save(product);
      return { ...product, images: images };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDTO) {

    const { limit = 10, offset = 0 } = paginationDto
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })
    return products.map(({ images, ...rest }) => ({
      ...rest,
      images: images.map(img => img.url)
    }))
  }

  async findOne(term: string): Promise<Product> {

    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('LOWER(title) =:title or slug = :slug', {
          title: term.toLocaleLowerCase(),
          slug: term,
        })
        .leftJoinAndSelect('prod.images', 'prodImage')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Productor with id ${term} not found`)
    return product;
  }

  async finOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }


  async update(id: string, updateProductDto: UpdateProductDto) {

    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({ id, ...toUpdate });
    if (!product) throw new NotFoundException(`No se encontro el producto`);

    // Create queryRunner 
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } })
        product.images = images.map(image => this.productImageRepository.create({ url: image }))
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      // await this.productRepository.save(product);
      return this.finOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

  async deleteAllProduct(){
    const query = this.productRepository.createQueryBuilder('product')

    try{
      return await query 
      .delete()
      .where({})
      .execute()
    }catch(error){
      this.handleExceptions(error)
    }
  }
  
}
