import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SobrePage } from '../sobre/sobre';
import { CadastrarProdutosPage } from '../cadastrar-produtos/cadastrar-produtos';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  rootPage = ProfilePage;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, public app: App,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
  
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  abrirPerfil(){
    this.navCtrl.push(ProfilePage);
  }
  abrirCadastroProduto(){
    this.navCtrl.push(CadastrarProdutosPage);
  }
  abrirSobre(){
    this.navCtrl.push(SobrePage);
  }
  logout() {

    this.app.getRootNav().setRoot('LoginPage');
  }

}
