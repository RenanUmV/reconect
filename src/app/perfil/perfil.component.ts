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
  tipoUsuario: string

  novaSenha: string
  verificaSenha: string

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

  confirmPassword(event: any) {
    this.verificaSenha = event.target.value;
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
    this.usuario.tipo = event.target.value
  }

  atualizar(){
    if(this.usuario.senha != this.verificaSenha){
      this.alertas.showAlertDanger('As senhas não são iguais!!')
    }else{
      this.authService.atualizar(this.usuario).subscribe((resp: UsuarioModel) => {
        this.usuario = resp;
        this.usuario.tipo = this.tipoUsuario
        
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso! Faça login novamente.')
        environment.id = 0
        environment.nome = ''
        environment.token = ''
        environment.foto = ''
        environment.tipo = ''
        this.router.navigate(['/login'])
    
        }, erro => {
        if (erro.status == 400, erro.status == 500) {
          this.alertas.showAlertDanger('Informações inválidas')
        }
        })
        }
    }
}
