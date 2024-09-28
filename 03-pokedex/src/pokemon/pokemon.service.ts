import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import {  isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
private readonly pokemonModel: Model<Pokemon>

  ){}
  
  async create(createPokemonDto: CreatePokemonDto) {
    
    Logger.log("===== CREANDO POKEMON  ======");
     createPokemonDto.name = createPokemonDto.name.toUpperCase();
try {
    
  const pokemon = await this.pokemonModel.create(createPokemonDto);
  return pokemon;  
} catch (error) {
   this.handleMongooseError(error);
}

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {
         let  pokemon : Pokemon;

          if(!isNaN(+id)){
            pokemon = await this.pokemonModel.findOne({no: id});
          }

          // validacion de id en  mongodb 
          if (isValidObjectId(id)){
            pokemon = await this.pokemonModel.findById(id);
          } 
          // validacion por name 
          if(!pokemon){
            pokemon = await this.pokemonModel.findOne({name: id.toUpperCase().trim()});
          }
            
          if(!pokemon)throw new NotFoundException(`Pokemon not found`);    
          
          return pokemon;
  }

    async  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    
    
    const pokemon =  await this.findOne(id);

    if(updatePokemonDto.name)
     updatePokemonDto.name = updatePokemonDto.name.toUpperCase();
    
    try {
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};
        } catch (error) {
      this.handleMongooseError(error);   
      }
    }
  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Pokemon not found`);
    return ; 
  }


  private handleMongooseError(error: any){
    if (error.code === 11000){
      throw new BadRequestException(`El pokemon ya existe en la base de datos ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException('Error al actualizar el pokemon');
  }
}
