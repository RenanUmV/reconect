import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  
  {path:'login', component: LoginComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'contato', component: ContatoComponent},

  {path:'inicio', component: InicioComponent},
  {path:'feed', component: FeedComponent},
  {path: 'tema', component: TemaComponent},

  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},
  {path: 'postagem-delete/:id', component: PostagemDeleteComponent},

  {path: 'perfil/:id', component: PerfilComponent},
  {path:'perfil-user/:id', component: PerfilUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
