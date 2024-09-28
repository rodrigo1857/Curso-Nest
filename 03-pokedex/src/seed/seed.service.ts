import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // yo importe el servicio pero tambien se puede importar el modelo 
  // constructor(
  //    private readonly  pokemonService : PokemonService,
  // ) {}

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}
  
 
  
   async executeSeed() {

      await this.pokemonModel.deleteMany({})// delete * from pokemon ;
      const data  = await  this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

      // insertar multiple 
       const inserPromise :{name: string , no:number}[] = [];
       data.results.forEach(({name, url}) => {
        const segmentos = url.split('/');
        const no = +segmentos[segmentos.length - 2];
        //const pokemon = await this.pokemonModel.create({ no, name });
        name = name.toUpperCase();
        inserPromise.push({ no, name});
      });
       const datos =  await  this.pokemonModel.insertMany(inserPromise);

      /* const transformedResults = await Promise.all(data.results.map(async ({name, url}) => {
        const segmentos = url.split('/');
        const no = +segmentos[segmentos.length - 2];
        const pokemon = await this.pokemonModel.create({ no, name });
        return { no, name };
      })); */
      //console.log(transformedResults);
      
      // console.log(transformedResults);
      // for (const pokemon of transformedResults) {
      //   await this.pokemonService.create(pokemon);
      // }
      return datos;
  }

}
