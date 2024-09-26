import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";

@Schema() 
export class Pokemon extends Document {

    // id string //  mongo lo genera automaticamente 
    @IsString()
    @Prop({
        unique: true,
        index: true
    })
   name: string;

   @IsNumber()
   @Prop({
    unique: true,
    index: true,
 })
   no: number; 
}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon);