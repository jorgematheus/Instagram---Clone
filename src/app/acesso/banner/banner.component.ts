import { Component, OnInit } from '@angular/core';
import { trigger, state, style,transition, animate } from '@angular/animations'
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))      
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido';

  public imagens: Imagem[] = [
    { estado: 'visivel' , url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido' , url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido' , url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido' , url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido' , url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit() {
    setInterval(() => this.logicaRotacao(), 3000)
  }

  public logicaRotacao(): void {
    for(let i: number = 0; i < this.imagens.length; i++) {
      let next: number;

      if(this.imagens[i].estado == 'visivel') {
        this.imagens[i].estado = 'escondido'; 
        next = i < (this.imagens.length - 1) ?  i + 1 : 0;   
        this.imagens[next].estado = 'visivel';                   
        break;         
      }     
    }
  }

}
