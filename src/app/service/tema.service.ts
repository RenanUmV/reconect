import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllTema(): Observable<TemaModel[]>{
    return this.http.get<TemaModel[]>('https://reconect.herokuapp.com/temas', this.token)
  }

  getByIdTema(id: number): Observable<TemaModel>{
    return this.http.get<TemaModel>(`https://reconect.herokuapp.com/temas/${id}`, this.token)
  }

  postTema(tema: TemaModel):Observable<TemaModel>{
    return this.http.post<TemaModel>('https://reconect.herokuapp.com/temas', tema, this.token)
  }

  putTema(tema: TemaModel): Observable<TemaModel>{
    return this.http.put<TemaModel>('https://reconect.herokuapp.com/temas', tema, this.token)
  }

  deleteTema(id: number){
    return this.http.delete(`https://reconect.herokuapp.com/temas/${id}`, this.token)
  }

}
