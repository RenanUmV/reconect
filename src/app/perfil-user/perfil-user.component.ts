import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario: number
  userId = environment.id

  postagem: PostagemModel = new PostagemModel()
  listaPostagem: PostagemModel[]

  key = 'data'
  reverse = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if (environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])   
    }
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUser(id).subscribe((resp: UsuarioModel)=>{
      this.usuario = resp
    })
  }

  verificaPerfilUsuario(){

    if(this.idUsuario == environment.id){
      return true
    }
    return false;
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
