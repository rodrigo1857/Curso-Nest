import { IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePokemonDto {

    /* si la informacion viene de un form data  la manera de validar numeros es la siguiente 
     @IsInt()
    @IsPositive()
    @Min(1)
    @Type( () => Number )
    no: number; */


    @IsInt()
    @IsNotEmpty()
    no: number; 


    @IsString ()
    @IsNotEmpty()
    @MinLength(3)
    name:string;

}
