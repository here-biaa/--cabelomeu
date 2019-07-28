import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController, Item } from 'ionic-angular';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';
import * as firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading';
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from '../../providers/firebase';


@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  produtos;
  user={
    uid:''
  };
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private storage: Storage,
    public actionctrl: ActionSheetController,
    public alertCtrl: AlertController,

  ) {
    this.loadingProvider.present().then(() => {
      this.getCurrentUser();
      this.getProdutos();
    });
  }
 
  abreDetalhe = produtos => this.navCtrl.push("DetalhesProdutoPage", { produtos });

  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  abreNotas() {
    this.navCtrl.setRoot('ListarNotasPage')
  }

  abreProdutos() {
    this.navCtrl.setRoot('ProdutoPage')
  }
  getCurrentUser = () => {
    this.firebaseProvider.getCurrentUser(this.user)
    this.storage.get("user_cabelomeu")
    .then(user => {
      this.user.uid = user.uid;
      console.log(this.user)
    });
  };

  getProdutos = () => {
    this.loadingProvider.dismiss();
    this.firebaseProvider.getProdutos()
    .subscribe(res => {
      this.produtos = res;
      console.log('Resposta',res)
      console.log('Uid', this.user.uid)
    })
 }
<<<<<<< HEAD

  getNotas = () => {
    this.firebaseProvider.getNotas()
      .subscribe(res => {
        this.anotacoes = res;
      });
  }

=======
  //Atualizar o usuario no local storage
>>>>>>> b5ee7cae4457fc75a1b16f626f7b7ac06ad353b7
  getAndSaveCurrentUser(uid) {
    this.firebaseProvider.getCurrentUser(uid)
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        let user = res[0];
        this.storage.set('user_cabelomeu', user);
      })
  }
   openOptions(item:any){
    let actionsheet = this.actionctrl.create({
      title: 'Produto',
      buttons : [
        {
          text: 'Editar',
          icon: 'md-create',
          handler: () => {
            
          }
        },
        {
          text:'Excluir',
          icon: 'ios-trash',
          role:'destructive',
          handler: () => {
            this.AlertConfirm(item)
          }
        },
      ]
    })
    actionsheet.present();
  }
  async AlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Realmente deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Excluir',
          handler: () => {
            this.Excluir(item)
          }
        }
      ]
    });

    await alert.present();
  }
  
  Excluir(item: any) {
    this.firebaseProvider.deletarNotas(item)
      .then(res => { this.navCtrl.pop() }

      )
  };

}
