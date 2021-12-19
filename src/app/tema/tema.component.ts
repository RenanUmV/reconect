import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    if (environment.token == ''){
      this.alertas.showAlertDanger('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
  }

  if(environment.tipo != 'administrador'){
    this.alertas.showAlertInfo('Você precisa ser administrador para acessar essa rota')
    this.router.navigate(['/feed'])   
  }
  
  this.findAllTemas()
  }

  cadastrar(){ 
    this.temaService.postTema(this.tema).subscribe((resp: TemaModel) => {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema Cadastrado com Sucesso!')
      this.findAllTemas()
      this.tema = new TemaModel()
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }


}
