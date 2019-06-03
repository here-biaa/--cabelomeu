import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  produtos;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,

  ) {
    this.produtos = this.navParams.get("produtos");

 }
  async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Realmente deseja apagar esse produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuar',
          handler: () => {
            this.apagar()
          }
        }
      ]
    });

    await alert.present();
  }

 apagar(){
   this.firebaseProvider.deletarProdutos(this.produtos)
     .then(res => {
       this.loadingProvider.dismiss();
       this.navCtrl.setRoot('ProdutoPage')
     });
 
  }
}