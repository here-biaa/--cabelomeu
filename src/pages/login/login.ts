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
export class LoginPage implements ErrorHandler {
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }


  form: FormGroup;
  formEmail: FormGroup;

  loggin = true;
  password = false;


  exibirLogin() {
    this.password = false;
    this.loggin = true;
  }

  exibirPassword() {
    this.password = true;
    this.loggin = false;
  }

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
    this.formEmail = this.formBuilder.group({
      email: ['', Validators.required],
    })
  }
  login() {
    this.loadingProvider.present().then(() => {
      let data = this.form.value;
      this.authProvider.login(data)
        //Successo
        .then((res) => {

          res.user = firebase.auth().currentUser;
          if (res.user.emailVerified) {
            console.log("email verified");
            this.getAndSaveCurrentUser(res.user.uid);
          } else {
            console.log("email not verified");
            this.loadingProvider.dismiss();

            let user = firebase.auth().currentUser;
            user.sendEmailVerification();
            this.alertCtrl.create({
              title: "Verifique e confirme seu email",
              subTitle: "É necessário a confirmação do e-mail de autenticação.",
              buttons: ["Ok"]
            }).present();

          }
        })
        .catch(() => {
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
  passwordReset() {
    this.loadingProvider.dismiss().then(() => {
      let data = this.formEmail.value;
      this.authProvider.password(data)
        .then((res) => {
          this.alertCtrl.create({
            title: "Verifique e confirme seu email",
            subTitle: "Enviamos um link de redefinição de senha no seu email.",
            buttons: ["Ok"]
          });
          this.navCtrl.setRoot('LoginPage');

        })
        .catch((err) => {
          console.log(err);

          this.loadingProvider.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Algo deu errado. ',
            subTitle: 'Usuário não encontrado .',
            buttons: ['Ok']
          });
          alert.dismiss();
        })
    })
  }
  getAndSaveCurrentUser(uid) {
    this.firebaseProvider.getCurrentUser(uid)
      .subscribe((res) => {
        let user = res[0];
        this.storage.set('user_cabelomeu', user).then(() => {
          this.loadingProvider.dismiss();
          this.navCtrl.setRoot('IntroPage');
        });
      })
  }

  createAccount = () => this.navCtrl.setRoot('CreateAccountPage');
  loginFacebook = () => this.navCtrl.setRoot('FbLoginPage');

}
