import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario: number

  novaSenha: string

  nome = environment.nome
  foto = environment.foto

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
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

  // atualizar(){


  //   this.authService.atualizar(this.usuario).subscribe((resp: UsuarioModel) => {
  //     this.usuario = resp;

      

  //     alert('Usuário atualizar com sucesso! Faça login novamente.')
  //     environment.id = 0
  //     environment.nome = ''
  //     environment.token = ''
  //     environment.foto = ''
  //     this.router.navigate(['/login'])

  //   }, erro => {
  //     if (erro.status == 400, erro.status == 500) {
  //       alert('Informações inválidas')
  //     }
  //   })
  // }
}
