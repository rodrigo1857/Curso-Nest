export const pokemonIds = [1,51,985,45];
pokemonIds.push(+'25');

//*Manejo de Interfaces 
interface Pokemon{
    id: number;
    name: string;
    age?: number;
}
// Manejo de Objetos
export const bulbasaur: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    age: 25
}

export const charmander: Pokemon = {
    id: 1,
    name: 'Charmander',
    age: 24
}

console.log(pokemonIds);
console.log(bulbasaur);

// Tipos de arreglos 
export const pokemons: Pokemon[]= [];
pokemons.push(charmander, bulbasaur);
console.log(pokemons);
