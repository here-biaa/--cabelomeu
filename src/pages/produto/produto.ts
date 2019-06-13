import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController, Item } from 'ionic-angular';
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
  anotacoes;
  user={
    uid:''
  };
  receita = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private db: AngularFireDatabase,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController,
    private storage: Storage,
    public actionctrl: ActionSheetController,
    public alertCtrl: AlertController,
    


  ) {
    this.loadingProvider.present().then(() => {
      this.getCurrentUser();
      this.getNotas();
      this.getProdutos();
    });
  }
  inicio= true;
  notas = false;

  abreNotas(){
    this.notas = true;
    this.inicio =false;
  }
  abreProduto(){
    this.inicio = true;
    this.notas = false;
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
    this.loadingProvider.dismiss();
    this.firebaseProvider.getProdutos()
    .subscribe(res => {
      this.produtos = res;
      console.log('Resposta',res)
      console.log('Uid', this.user.uid)
    })
 }

  //Listar notas
  getNotas = () => {
    this.firebaseProvider.getNotas()
      .subscribe(res => {
        this.anotacoes = res;
      });
  }

  //Atualizar o usuario no local storage
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
            //this.AlertConfirm()
            this.Excluir(item)
          }
        },
        {
          text:'Ver receita',
          icon: 'md-eye',
          role:'destructive',
          handler: () => {
            
          },
        }
      ]
    })
    actionsheet.present();
  }
  Editar(){}

  verReceita(){
    this.receita = true;
  }
  FecharNota(){
    this.receita=false;
  }
  Excluir(item:any){
      this.firebaseProvider.deletarNotas(item)
        .then(res => {this.navCtrl.pop()}

        )};
  async AlertConfirm() {
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
            this.Excluir(Item)
          }
        }
      ]
    });

    await alert.present();
  }

}
