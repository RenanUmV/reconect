import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDTO } from '../model/UserLoginDTO';
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
    private router: Router
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
  
      this.router.navigate(['/feed'])
        
      }, erro => {
        if(erro.status == 500){
          alert('Username or password incorrect')
        }
      })

  }

}
