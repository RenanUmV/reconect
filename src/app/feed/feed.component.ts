import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {  

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]
  idTema: number

  idUsuario = environment.id
  usuario: UsuarioModel = new UsuarioModel()

  postagem: PostagemModel = new PostagemModel()
  listaPostagem: PostagemModel[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagensService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    if (environment.token == ''){
      alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])   
    }
    this.authService.refreshToken()
    this.findAllTemas()
    this.getAllPostagens()  
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: UsuarioModel)=>{
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel)=>{
      this.postagem = resp
      alert('Postagem realizada!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }

  
}