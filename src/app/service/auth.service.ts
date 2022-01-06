import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO } from '../model/UserLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  logar(userLogin: UserLoginDTO): Observable<UserLoginDTO>{
    return this.http.post<UserLoginDTO>('https://reconect.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(usuario: UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://reconect.herokuapp.com/usuarios/cadastrar', usuario)
  }

  getByIdUser(id: number):Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`https://reconect.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }

  administrador(){
    let ok: boolean = false

    if(environment.tipo == 'administrador'){
      ok = true
    }
    
    return ok
  }

  atualizar(usuario: UsuarioModel): Observable<UsuarioModel> {

    return this.http.put<UsuarioModel>('https://reconect.herokuapp.com/usuarios/atualizar', usuario, this.token);

  }
  
}
