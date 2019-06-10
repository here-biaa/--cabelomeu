import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';


@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {
  listagem = true;
  editar= false;
  produtos;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    public actionctrl:ActionSheetController,

  ) {
    this.produtos = this.navParams.get("produtos");

 }
  async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Deseja apagar esse produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Apagar',
          handler: () => {
            this.apagar()
          }
        }
      ]
    });

    await alert.present();
  }
  openOptions(){
    let actionsheet = this.actionctrl.create({
      title: 'Produto',
      buttons : [
        {
          text: 'Editar',
          icon: 'md-create',
          handler: () => {
            this.Editar()
          }
        },
        {
          text:'Excluir',
          icon: 'ios-trash',
          role:'destructive',
          handler: () => {
            this.AlertConfirm()
          }
        }
      ]
    })
    actionsheet.present();
  }

 apagar(){
   this.firebaseProvider.deletarProdutos(this.produtos)
     .then(res => {
       this.loadingProvider.dismiss();
       this.navCtrl.setRoot('ProdutoPage')
     });
 
  }
  Editar(){
    this.editar = true;
    this.listagem = false;
  }
  Atualizar(){
    let data = {
      marca: this.produtos.marca,
      obs: this.produtos.obs,
      tipo: this.produtos.tipo,
     
    };
    
    this.firebaseProvider.updateProdutos(data)
      .then(res => {
        console.log(res)
        this.loadingProvider.dismiss();
        this.navCtrl.setRoot('ProdutoPage')
     });
    
  }
}