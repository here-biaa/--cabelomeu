import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from '../../providers/firebase';

@IonicPage()
@Component({
  selector: 'page-listar-notas',
  templateUrl: 'listar-notas.html',
})
export class ListarNotasPage {
  verItem;
  anotacoes;
  inicio=true;
  listagem =false;
  user = {
    uid: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private storage: Storage,
    public actionctrl: ActionSheetController,
    public alertCtrl: AlertController,

    ) 
    {
    this.loadingProvider.present()
    .then(() => {
      this.getCurrentUser();
      this.getNotas();
     });

    }
  abreProdutos(){
    this.navCtrl.setRoot('ProdutoPage')
  }

  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };
  //Listar notas
  getNotas = () => {
    this.loadingProvider.dismiss()
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
  Inicio(){
    this.inicio = true;
    this.listagem = false;

  }
  openOptions(item:any){
    let actionsheet = this.actionctrl.create({
      title: 'Notas',
      buttons: [
        {
          text: 'Ver receita',
          icon: 'md-eye',
          role: 'destructive',
          handler: () => {
            item = this.verItem;
            this.verReceita()
          }
        },
        {
          text: 'Editar',
          icon: 'md-create',
          handler: () => {

          }
        },
        {
          text: 'Excluir',
          icon: 'ios-trash',
          role: 'destructive',
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
  verReceita() {
    this.inicio = false;
    this.listagem = true;
  }

  Excluir(item: any) {
    this.firebaseProvider.deletarNotas(item)
      .then(res => { 
        this.inicio = true;
        
       }

      )
  };


}
