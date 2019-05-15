import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase';
import { ProgressoService } from '../../progresso.service';
import {  interval, Subject, empty } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>();

  

  public formNovaPublicacao: FormGroup = new FormGroup({
   titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
   imagem: new FormControl('')
  })

  private _imagem: any; 
  private email: string;
   

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload = 0;

  constructor(private bd: Bd, private progresso: ProgressoService, private toastr: ToastrManager) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })  
  }

  public publicar(): void {

    let object = { 
      titulo: this.formNovaPublicacao.value.titulo,
      email:  this.email,
      imagem: this._imagem
    }
    
    let continua = new Subject()

    interval(1500)
    .pipe(takeUntil(continua))
    .subscribe(() => {
      //console.log(this.progresso.status)
      //console.log(this.progresso.estado)
      this.progressoPublicacao = 'andamento'

      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

      if(this.progresso.status == 'concluido') {
        this.toastr.successToastr('Publicação realizada!', 'Sucesso!', {toastTimeout: 3000});
        this.progressoPublicacao = 'concluido'  
          
        continua.next(false);

        //emitir um evento do componente parent (home)
        this.atualizarTimeline.emit();
      }
    })

    this.bd.publicar(object);     
   

  }

  public preparaImagemUpload($event) {       
    this._imagem = $event.target.files[0];
    
  }


}
