import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition,animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner',[
      state('criado', style({
        opacity : 1,
        transform : 'translateX(0)' 
      })),   
      //qualquer elemento ainda não renderizado no dom, está na condição de void   
      transition('void => criado', [
        style({ 
          opacity: 1,
          transform : 'translateX(-100px)'  
        }),
        animate('1s 0s ease-in-out')  //duração, delay e aceleração       
      ])
    ]),

    //animação login e cadastro
    trigger('animacao-login-cadastro', [
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
        animate('1s 0s ease-in-out')
      ])
    ])   
  ]
})




export class AcessoComponent implements OnInit {

  public estado: string = 'criado';
  public componenteCadastro: boolean = false;  

  constructor() { }  

  ngOnInit() {
  }  

  public exibirPainel(event: string): void {    
    this.componenteCadastro = event == 'cadastro' ? true : false;    
  }

}
