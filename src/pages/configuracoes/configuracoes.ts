import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SobrePage } from '../sobre/sobre';
import { CadastrarProdutosPage } from '../cadastrar-produtos/cadastrar-produtos';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  rootPage = ProfilePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
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
