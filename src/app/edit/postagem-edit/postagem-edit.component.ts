import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { TemaModel } from 'src/app/model/TemaModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]
  idTema: number

  urlIframe: string = this.postagem.foto;
  urlSafe: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagensService,
    private temaService: TemaService,
    private alertas: AlertasService,
    public authService: AuthService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel)=>
    {
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: PostagemModel) => {
      this.alertas.showAlertInfo('Postagem atualizada com sucesso!')
      this.router.navigate(['/feed'])
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

}
