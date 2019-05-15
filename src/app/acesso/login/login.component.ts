import { Component, OnInit, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ToastrManager } from 'ng6-toastr-notifications'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    //animação de erro login e cadastro
    trigger('animacao-login-cadastro-error', [
      state('criado', 
        style({
          opacity : 1,
          transform : 'translateX(0)'
        })
      ),
      //qualquer elemento ainda não renderizado no dom, está na condição de void  
      transition('void => criado', [
        style({
          opacity : 0,
          transform : 'translateX(100px)'
        }),
        animate('1s 0s ease-in-out', keyframes([       
          style({opacity: 1, transform: 'translateY(-10px)', offset: 0.88 }),
          style({opacity: 1, transform: 'translateY(10px)', offset: 0.90 }),
          style({opacity: 1, transform: 'translateY(-10px)', offset: 0.92 }),
          style({opacity: 1, transform: 'translateY(10px)', offset: 0.94 }),
          style({opacity: 1, transform: 'translateY(-10px)', offset: 0.96 })         
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  
  public messageFeedback: string = '';
  public messageButton = 'Entrar';
  public botaoDisabled = false;

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('jorge.matheus10@hotmail.com', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private autenticacao: Autenticacao, private toastr: ToastrManager) {  }

  ngOnInit() {
    console.log(this.formLogin)
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public efetivarLogin(): void {
    this.botaoDisabled = true;
    this.messageButton = 'Aguarde...'
    let form = this.formLogin;       

    this.autenticacao.autenticar(form.value.email, form.value.senha)
      .then((retorno: any) => {      
        this.messageFeedback = retorno;
        this.messageButton = 'Entrar';
        this.botaoDisabled = false;        
        
        //verifica se o objeto retornado tem a propiedade code
        if(retorno.hasOwnProperty('code')) {
          this.toastr.errorToastr('Login ou senha incorretos!', 'Atenção!', /*{toastTimeout: 500000}*/);
        }
      })   
  }

  



}
