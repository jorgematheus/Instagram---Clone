import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { ROUTES } from './app.route';

import LocalePt from '@angular/common/locales/pt'

//toast (notificacoes)
import { ToastrModule } from 'ng6-toastr-notifications'



//services
import { Autenticacao } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { registerLocaleData } from '@angular/common';
import { Bd } from './bd.service';
import { ProgressoService } from './progresso.service';

registerLocaleData(LocalePt, 'pt')


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    AcessoComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    BrowserAnimationsModule,  
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ToastrModule.forRoot()
      
  ],
  providers: [
    Autenticacao, AutenticacaoGuard, Bd, ProgressoService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
