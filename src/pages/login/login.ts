import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements ErrorHandler{
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  login() {
    this.loadingProvider.present().then(() =>{
      let data = this.form.value;
      this.authProvider.login(data)
        //Successo
        .then((res) => {
  
            // Se o usuario verificar o email ele vai logar
           res.user.uid = firebase.auth().currentUser;
          if (res.user.emailVerified) {
            console.log("email verified");
            this.getAndSaveCurrentUser(res.user.uid);
            // 
          } else {
            // Senão ele vai receber um alerta
            console.log("email not verified");
            this.loadingProvider.dismiss();
            this.alertCtrl.create({
              title: "Verifique e confirme seu email",
              subTitle: "É necessário a confirmação do e-mail de autenticação.",
              buttons: ["Ok"]
            }).present();

          }
        })
        //Erro
        .catch(() => {
          // Se o usuario digitar um email ou senha incorreta
          this.loadingProvider.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Algo deu errado. ',
            subTitle: 'Usuário ou senha incorreta.',
            buttons: ['Ok']
          });
          alert.present();
        })
    });
  } 

  getAndSaveCurrentUser(uid){
    this.firebaseProvider.getCurrentUser(uid)
    .subscribe((res) => {
      let user = res[0];
      this.storage.set('user_cabelomeu', user).then(() =>{
        this.loadingProvider.dismiss();
        this.navCtrl.setRoot('TabsPage');
      });
    })
  }

  /**
   * Seta o root da aplicação na página de criar conta
   */
  createAccount = () => this.navCtrl.setRoot('CreateAccountPage');
  loginFacebook = () => this.navCtrl.setRoot('FbLoginPage');

}
