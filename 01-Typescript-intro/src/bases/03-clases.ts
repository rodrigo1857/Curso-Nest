import axios from 'axios';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
export class Pokemon {
    // todo Manera tradicional
    /**  
    public id: number;
    public name: string;
  
    constructor(id:number,name:string) {
      this.id = id;
      this.name = name;
      console.log("constructor llamado");
    } */ 
    
    get imageUrl():string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    // todo Manera simplificada 
    constructor(
    public  id: number,
    public name: string,
    // todo: Inyectar dependencias
    ) {}

    scream(){
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak(){
        console.log(`Hola soy ${this.name}`);
    }
   async getmove(): Promise<Move[]> {
    const {data} =  await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4')
    //const moves = 10;
    // return response;
    console.log(data.moves);
    return data.moves;
   }

}
export const charmander = new Pokemon(4,'Charmander');

// console.log(charmander);
// console.log(charmander.imageUrl);
// charmander.speak();
// charmander.scream();
// console.log(charmander.getmove());
 charmander.getmove();
