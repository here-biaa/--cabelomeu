import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {
  @Input() numEstrelas:number = 5;
  @Input() value: number = 2.5;
  @Output() fav :EventEmitter<number>= new EventEmitter<number>();

  estrelas: string[] =[];
  produtos;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.produtos = this.navParams.get("produtos");
 }
  ngAfterViewInit(){
    this.calc();
   }
   calc(){ 
     this.estrelas = [];
     let tmp = this.value;
     for (let i = 0; i < this.numEstrelas; i++ , tmp--) {
       if (tmp >= 1) {
         this.estrelas.push("star");
       }
       else if (tmp > 0 && tmp < 1) {
         this.estrelas.push("star-half");

       }
       else
         this.estrelas.push("star-outline");
     }

   }
  favoritar(index){
    this.value= index + 1;
    this.fav.emit(this.value);
    this.calc();
  }
  }
