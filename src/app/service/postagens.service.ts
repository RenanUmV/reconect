import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class PostagensService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }
  getAllPostagens(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>('https://reconect.herokuapp.com/postagens', this.token)
  }

  getByIdPostagem(id: number): Observable<PostagemModel>{
    return this.http.get<PostagemModel>(`https://reconect.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(postagem: PostagemModel):Observable<PostagemModel>{
    return this.http.post<PostagemModel>('https://reconect.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(postagem: PostagemModel): Observable<PostagemModel>{
    return this.http.put<PostagemModel>('https://reconect.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(`https://reconect.herokuapp.com/postagens/${id}`, this.token)
  }

}
