import { Injectable } from '@angular/core';
import { IGeneric } from './igeneric';
import { HttpClient } from '@angular/common/http';
import { AbilitieDTO } from '../dto/abilitie-dto';
import { ESystem } from '../enum/e-system';
import { EAbilitie } from '../enum/e-abilitie';
import { catchError } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AbilitieService implements IGeneric {

  constructor(private http: HttpClient, private utilitieService: UtilitiesService) { }
  persistir(abilitie: AbilitieDTO) {
    let abilitieTemp = new AbilitieDTO();
    abilitieTemp.name = abilitie.name;
    abilitieTemp.description = abilitie.description;
    return this.http.post<AbilitieDTO>(ESystem.URL_TEMP + EAbilitie.REGISTER_ABILITIE, abilitieTemp).
      pipe(catchError(this.utilitieService.handleError));
  }
  editar(abilitie: AbilitieDTO) {
    let abilitieTemp = new AbilitieDTO();
    abilitieTemp.name = abilitie.name;
    abilitieTemp.description = abilitie.description;
    return this.http.put<AbilitieDTO>(ESystem.URL_TEMP + EAbilitie.UPDATE_ABILITIE + abilitie.id, abilitieTemp).
      pipe(catchError(this.utilitieService.handleError));
  }
  listar(){
    return this.http.get<AbilitieDTO[]>(ESystem.URL_TEMP + EAbilitie.SEARCH_ALL_ABILITIES).
    pipe(catchError(this.utilitieService.handleError));
  }
}
