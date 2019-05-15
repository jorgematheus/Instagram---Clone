import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { Usuario }  from '../usuario.model' 

//services
import { Autenticacao } from '../../autenticacao.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'] 
})
export class CadastroComponent implements OnInit {

  constructor(private autenticacao: Autenticacao)  { } 
  
  public botaoDisabled: boolean = false;
  public messageButton: string = 'Cadastre-se!';
  public messageFeedback: string = '';
  
  public formCadastro: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastroUsuario(): void {

    //tratamento de feedback no botão
    this.botaoDisabled = true;
    this.messageButton = 'Cadastrando...'
   

    let form = this.formCadastro;
    
    form.controls.email.markAsTouched();
    form.controls.nome.markAsTouched();
    form.controls.usuario.markAsTouched();
    form.controls.senha.markAsTouched();

    let usuario: Usuario = new Usuario(
      form.value.nome,
      form.value.email,
      form.value.usuario,
      form.value.senha
    );
    this.autenticacao.cadastrarUsuario(usuario)
    .then((retorno) => {

      this.botaoDisabled = false;
      this.messageButton = 'Cadastre-se!'
      this.messageFeedback = retorno.message
      console.log(retorno)

      if(retorno.operationType == 'signIn') {
        this.exibirPainelLogin()
      }
      
    })
  }



}
