import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  constructor(
     private readonly  pokemonService : PokemonService,
  ) {}
  
  private  readonly axios: AxiosInstance = axios;
  
   async executeSeed() {

      const{data} = await  this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

      const transformedResults = data.results.map(({name, url}) => {
        const segmentos = url.split('/');
        const no = +segmentos[segmentos.length - 2];
        return { no, name };
      });

      console.log(transformedResults);
      for (const pokemon of transformedResults) {
        await this.pokemonService.create(pokemon);
      }
    return data.results;
  }

}
