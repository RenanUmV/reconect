import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagensService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      this.alertas.showAlertDanger('Postagem apagada com sucesso!')
      this.router.navigate(['/feed'])
    })
  }

}