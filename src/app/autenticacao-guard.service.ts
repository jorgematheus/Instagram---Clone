import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao, private router: Router) {}

    canActivate(): boolean {
       return this.autenticacao.autenticado();    
    }

}