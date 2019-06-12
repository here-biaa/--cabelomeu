import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController, AlertController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { PasswordValidator } from '../../validacao/senha.validacao';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  validacao_form: FormGroup;
  resp;
  user = {
    pass: '',
    uid: '',
    novaSenha:''
   };

  constructor(
    private view: ViewController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public app: App,

    ) 
    {
      this.buildForm();
      this.getCurrentUser();
      console.log(this.user)
    }
  buildForm() {
    this.validacao_form = this.formBuilder.group({
      pass: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      novaSenha: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),

      confirmPass: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]))
    },{
      Validators: PasswordValidator.isMatching
    })};

  
  closeModal(){
    this.view.dismiss();
  }
  alterarSenha(){
    if(this.user.pass == this.validacao_form.value.novaSenha)
    {
      this.loadingProvider.dismiss();
      let user = firebase.auth().currentUser;
      var newPassword = this.validacao_form.value.novaSenha;
      user.updatePassword(newPassword)
        .then(function () {
        // Update successful.
        this.presentToast();
          this.alertCtrl.create({
            title: "Alerta de Segurança",
            subTitle: "Para sua segurança é necessário que você faça login com sua nova senha!",
            buttons: ["Ok"]
          }).present();
          this.logout()
      },
       )
      .catch(function (error) {
        // An error happened.
      });
    }
    else
      this.alertCtrl.create({
        title: "Impossivel acesso",
        subTitle: "Para obter uma nova senha é necessário que sua senha antiga esteja correta, por favor digite uma senha válida!",
        buttons: ["Ok"]
      }).present();

  }
  logout() {

    this.loadingProvider.dismiss()
      .then((resposta) => {
        this.resp = resposta
        this.storage.remove('user_cabelomeu')
        this.app.getRootNav().setRoot('LoginPage');
        if (this.resp = true) {
          this.storage.set('slideCompleto', this.user);
        }
        console.log(this.resp)

      })

  }  

  //Buscar dados do usuario no storage
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Senha alterada com sucesso',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }


}
