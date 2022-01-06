import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
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
  selecionarTema: string = 'todos'  

  nomeUsuario = environment.nome
  fotoUsuario = environment.foto
  idUsuario = environment.id
  usuario: UsuarioModel = new UsuarioModel()

  postagem: PostagemModel = new PostagemModel()
  listaPostagem: PostagemModel[]

  urlIframe: string = this.postagem.foto;
  urlSafe: SafeResourceUrl;
  
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagensService,
    public authService: AuthService,
    private alertas: AlertasService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(){    

    if (environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça login novamente')
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
      this.selecionarTema = "todos"
    })
    
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }

  testandoIframe(){
    
    if (this.postagem.foto){
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.postagem.foto);  
    }else{
      this.urlSafe = ""
    }
      
  }

  verificandoVideo(urlIframe: string) {
    let regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\-]+\?v=|embed\/|v\/))(\S+)?$/

    if (regex.test(urlIframe)) {
      return true
    }
    else {
      return false;
    }
  }

  findByIdTemaPostagens(event: any) {
    if (event.target.value != "todos") {
      this.temaService.getByIdTema(event.target.value).subscribe((resp: TemaModel) => {
        this.tema = resp;        
      })}else{
        this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) => {
          this.listaPostagem = resp;    
        })
      }
  }

  filtrarPostagemTema() {
    if (this.selecionarTema != "todos") {         
      return true;
    }
    return false;
  }

  filtrarPostagemGeral() {
    if (this.selecionarTema == "todos") {
      return true;
    }
    return false;
  }  
  
}