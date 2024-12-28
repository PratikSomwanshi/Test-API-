import { HttpStatus, Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { pokemonData } from 'utils/contant/pokemon_data';
import { ErrorCode } from 'utils/enums/error_code';
import { CustomException } from 'utils/exception/custom_exception';

@Injectable()
export class PokemonService {
  public getAllPokemon() {
    return pokemonData;
  }

  public getPokemonById(id: number) {
    const pokemon = pokemonData.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new CustomException(
        'Pokemon not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.GENERAL_ERROR,
      );
    }

    return pokemon;
  }
}
