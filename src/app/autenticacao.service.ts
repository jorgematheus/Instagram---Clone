import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';


@Injectable()
export class Autenticacao {

    constructor(private router: Router) { }

    public token_id: string;
    public message: any;

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                
                //removendo a senha do objeto usuario
                delete usuario.senha;

                //registrando dados do usuario o path email em base 64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })

                return resposta;
            })
            .catch((error) => {
                return error;
            })
    }

    public autenticar(email: string, senha: string): Promise<any> {       

        return firebase.auth().signInWithEmailAndPassword(email, senha)            
            .then((status: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('token_login', idToken);
                        this.router.navigate(['/home'])
                    })
                   
                    return status;
            })
            .catch((error: any) => {               
                return error;
            })       
    }

    public autenticado(): boolean {
        if(this.token_id  === undefined && localStorage.getItem('token_login') != null) {            
            this.token_id = localStorage.getItem('token_login');
        } 

        if(this.token_id === undefined) {
            this.router.navigate(['/']);
        }
        
        return this.token_id != undefined;

    }

    public logout(): void {
        firebase.auth().signOut()
           .then(() => {
               localStorage.removeItem('token_login');
               this.token_id = undefined;
               this.router.navigate(['/']);
            })        
    }

}