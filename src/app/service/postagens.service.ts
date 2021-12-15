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
  getAllPostagens(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>('https://reconect.herokuapp.com/postagens', this.token)
  }

  postPostagem(postagem: PostagemModel):Observable<PostagemModel>{
    return this.http.post<PostagemModel>('https://reconect.herokuapp.com/postagens', postagem, this.token)
  }
}
