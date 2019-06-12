import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, Loading } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SobrePage } from '../sobre/sobre';
import { CadastrarProdutosPage } from '../cadastrar-produtos/cadastrar-produtos';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore'
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  rootPage = ProfilePage;
  resp:boolean;
  public currentUser: any; 
  public loading: Loading;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public app: App,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    private storage: Storage,
    public alertCtrl: AlertController
  
    ) {
    this.currentUser = this.authProvider.getCurrentUser();
    this.alertCtrl.create();
  }
  user ={
    uid: ''
  }
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
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
    
    this.loadingProvider.dismiss()
      .then((resposta) => {
          this.resp = resposta
          this.storage.remove('user_cabelomeu')
          this.app.getRootNav().setRoot('LoginPage');
          if(this.resp = true){
            this.storage.set('slideCompleto', this.user);
           }
        console.log(this.resp)

        })
        
      }  
  deletarConta(){
    
  }
  
  async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Realmente deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.logout()
          }
        }
      ]
    });

    await alert.present();
  }


  }