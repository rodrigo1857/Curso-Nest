import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
private readonly pokemonModel: Model<Pokemon>

  ){}
  
  async create(createPokemonDto: CreatePokemonDto) {
    
    Logger.log("===== CREANDO POKEMON=======");
     createPokemonDto.name = createPokemonDto.name.toUpperCase();
try {
    
  const pokemon = await this.pokemonModel.create(createPokemonDto);
  return pokemon;  
} catch (error) {
   if (error.code === 11000){
    throw new BadRequestException(`El pokemon ya existe en la base de datos ${JSON.stringify(error.keyValue)}`);
   }else {
    console.log(error);
    throw new InternalServerErrorException('Error al crear el pokemon');
   }
}

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
