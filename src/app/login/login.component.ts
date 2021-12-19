import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO } from '../model/UserLoginDTO';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLoginDTO = new UserLoginDTO()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
  }

  entrar(){

    this.auth.logar(this.userLogin).subscribe((resp: UserLoginDTO)=>{
      this.userLogin = resp
  
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id  
      environment.tipo =  this.userLogin.tipo
  
      this.router.navigate(['/feed'])
        
      }, erro => {
        if(erro.status == 401){
          this.alertas.showAlertDanger('Usuário ou senha estão incorretos')
        }
      })

  }

}
