import { Injectable } from '@angular/core';
import { IGeneric } from './igeneric';
import { PokemonDTO } from '../dto/pokemon-dto';
import { HttpClient } from '@angular/common/http';
import { ESystem } from '../enum/e-system';
import { EPokemon } from '../enum/e-pokemon';
import { UtilitiesService } from './utilities.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IGeneric{

  constructor(private http: HttpClient, private utilitieServices: UtilitiesService) { }

  listar() {
    return this.http.get<PokemonDTO[]>(ESystem.URL_TEMP+EPokemon.SEARCH_ALL_POKEMON).
    pipe(catchError(this.utilitieServices.handleError));
  }
  
  persistir(pokemon: PokemonDTO) {
    
    let dataTemp = new PokemonDTO();
    dataTemp.name = pokemon.name;
    dataTemp.types = pokemon.types;
    dataTemp.abilities = pokemon.abilities;
    dataTemp.sprite_url = pokemon.sprite_url;

    return this.http.post<PokemonDTO>(ESystem.URL_TEMP+EPokemon.REGISTER_POKEMON,dataTemp).
    pipe(catchError(this.utilitieServices.handleError));
  }
  editar(pokemon: PokemonDTO){
    let dataTemp = new PokemonDTO();
    dataTemp.name = pokemon.name;
    dataTemp.types = pokemon.types;
    dataTemp.abilities = pokemon.abilities;
    dataTemp.sprite_url = pokemon.sprite_url;

    return this.http.put<PokemonDTO>(ESystem.URL_TEMP+EPokemon.UPDATE_POKEMON+pokemon.id,dataTemp).
    pipe(catchError(this.utilitieServices.handleError));
  }

  eliminar(pokemon: PokemonDTO) {
    return this.http.delete<PokemonDTO>(ESystem.URL_TEMP+EPokemon.DELETE_POKEMON+pokemon.id).
    pipe(catchError(this.utilitieServices.handleError));
  }

  consultarNombre(pokemon: PokemonDTO){
    return this.http.get<PokemonDTO[]>(ESystem.URL_TEMP+EPokemon.SEARCH_POKEMON_BY_NAME+pokemon.name).
    pipe(catchError(this.utilitieServices.handleError));
  }
}
