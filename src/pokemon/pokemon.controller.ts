import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { successResponse } from 'utils/response/success_response';
import { SuccessCode } from 'utils/enums/success_code';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('pokemon')
export class PokemonController {
  private readonly logger = new Logger(PokemonController.name);

  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAllPokemon() {
    const pokemonData = this.pokemonService.getAllPokemon();

    const success = successResponse(
      'Pokemon data fetched successfully',
      pokemonData,
      SuccessCode.GENERAL_SUCCESS,
    );

    return success;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public getPokemon(@Param('id') id: string) {
    this.logger.debug(`Fetching pokemon with id: ${id} type ${typeof id}`);

    const pokemonData = this.pokemonService.getPokemonById(parseInt(id));

    const success = successResponse(
      'Pokemon fetched successfully',
      pokemonData,
      SuccessCode.GENERAL_SUCCESS,
    );

    return success;
  }
}
