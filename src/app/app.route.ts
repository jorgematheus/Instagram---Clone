import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoGuard } from './autenticacao-guard.service';


export const ROUTES: Routes = [
    { path: 'login', component: AcessoComponent },
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [ AutenticacaoGuard ] }     
]