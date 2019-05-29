import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider
  ) {
    this.produtos = this.navParams.get("produtos");

 }

 apagar(){
   this.firebaseProvider.deletarProdutos(this.produtos)
     .then(res => {
       this.loadingProvider.dismiss();
       this.navCtrl.setRoot('ProdutoPage')
     });
 
  }
}