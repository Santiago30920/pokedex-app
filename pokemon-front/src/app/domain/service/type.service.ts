import { Injectable } from '@angular/core';
import { IGeneric } from './igeneric';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { TypeDTO } from '../dto/type-dto';
import { ESystem } from '../enum/e-system';
import { EType } from '../enum/e-type';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService implements IGeneric{

  constructor(private http:HttpClient, private utilitieService: UtilitiesService) { }
  persistir(type: TypeDTO) {
    let typeTemp = new TypeDTO();
    typeTemp.name = type.name;
    return this.http.post<TypeDTO>(ESystem.URL_TEMP+EType.REGISTER_TYPE, typeTemp).
    pipe(catchError(this.utilitieService.handleError));
  }
  editar(type: TypeDTO) {
    let typeTemp = new TypeDTO();
    typeTemp.name = type.name;
    return this.http.put<TypeDTO>(ESystem.URL_TEMP+EType.UPDATE_TYPE+type.id, typeTemp).
    pipe(catchError(this.utilitieService.handleError));
  }
  listar() {
    return this.http.get<TypeDTO[]>(ESystem.URL_TEMP+EType.SEARCH_ALL_TYPE).
    pipe(catchError(this.utilitieService.handleError));
  }

  eliminar(type: TypeDTO){
    return this.http.delete<TypeDTO>(ESystem.URL_TEMP+EType.DELETE_TYPE+type.id).
    pipe(catchError(this.utilitieService.handleError));
  }
}
