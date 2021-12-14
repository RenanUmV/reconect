import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'inicio', component: InicioComponent},
  {path:'feed', component: FeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
