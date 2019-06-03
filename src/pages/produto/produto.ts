import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';
import { FirebaseProvider } from '../../providers/firebase';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  produtos;
  user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private firebaseProvider: FirebaseProvider,
    private db : AngularFireDatabase,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController,
    private storage: Storage,
    ) {
    this.loadingProvider.present().then(() => {
      this.getCurrentUser();
      this.getProdutos();
    });
    }

  abreDetalhe = produtos => this.navCtrl.push("DetalhesProdutoPage", { produtos });

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  //Listar produtos
  getProdutos = () => {
    this.firebaseProvider.getProdutos().subscribe(res => {
      this.loadingProvider.dismiss();
      this.produtos = res;
    });
  }
  getItems(ev) {
    this.produtos;

    var val = ev.target.value;
if (val && val.trim() != '') {
      this.produtos= this.produtos.filter((produtos) => {
        return produtos
     })
    }
  }
}
