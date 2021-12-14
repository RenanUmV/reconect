import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDTO } from '../model/UserLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  logar(userLogin: UserLoginDTO): Observable<UserLoginDTO>{
<<<<<<< HEAD
    return this.http.post<UserLoginDTO>('http://localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('http://localhost:8080/usuarios/cadastrar', usuario)
  }
  
=======
    return this.http.post<UserLoginDTO>('https://reconect.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(usuario: UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://reconect.herokuapp.com/usuarios/cadastrar', usuario)
  }

>>>>>>> 0f13d6ccbea74df295759860075bd4c4748669d9
}
