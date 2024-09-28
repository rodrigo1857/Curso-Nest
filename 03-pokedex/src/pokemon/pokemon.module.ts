import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ]
      
    )

  ],
  // Uno es exportar el servicio para que pueda ser inyectado en otros modulos y
  // el otro es exportar el modulo de mongoose para que pueda ser inyectado en otros modulos
  exports: [PokemonService, MongooseModule],
})
export class PokemonModule {}
