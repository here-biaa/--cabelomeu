import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { FirebaseProvider } from "../../providers/firebase";
import { LoadingProvider } from "../../providers/loading";
import { Storage } from "@ionic/storage";
import { PasswordValidator } from '../../validacao/senha.validacao';
import { firebase } from '@firebase/app';
@IonicPage()
@Component({
  selector: "page-create-account",
  templateUrl: "create-account.html"
})
export class CreateAccountPage {
  validacao_form: FormGroup;
  uid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.buildForm();
  }
  buildForm() {
    this.validacao_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)

      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      pass: new FormControl('', Validators.compose([
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
    }, {
        Validators: PasswordValidator.isMatching
      })
  };

  registrar() {
    if (this.validacao_form.valid) {
      this.validacao_form.controls['name'].value,
        this.validacao_form.controls['email'].value,
        this.validacao_form.controls['pass'].value;
    }
    this.loadingProvider.present().then(() => {
      let data = this.validacao_form.value;
      /* Puxando do provedor o metodo de registro*/
      this.authProvider
        .register(data)
        //Success
        .then(res => {
          console.log(res);
          this.uid = res.user.uid;
          console.log("ok",res);
     
          let user = firebase.auth().currentUser;
          user.sendEmailVerification();
          this.loadingProvider.dismiss();
          this.alertCtrl.create({
            title: "Verifique seu email",
            subTitle: "Enviamos um e-mail de autenticação para você.",
            buttons: ["Ok"]
          }).present();
<<<<<<< HEAD

=======
          this.createUserOnFirestore();
>>>>>>> b5ee7cae4457fc75a1b16f626f7b7ac06ad353b7
        })
        //Error
        .catch((err) => {
          console.log(err);
          this.loadingProvider.dismiss();
          this.alertCtrl.create({
            title: "Ops",
            subTitle: "Esse e-mail ja está cadastrado, entre com um e-mail válido.",
            buttons: ["Ok"]
          }).present();
        });
    });
  }

  createUserOnFirestore = () => {
    let data = {
      name: this.validacao_form.value.name,
      email: this.validacao_form.value.email,
      pass: this.validacao_form.value.pass,
      uid: this.uid
    };

    this.firebaseProvider.postUser(data)
    .then(res => {
      this.navCtrl.setRoot('LoginPage')

    });
  }

  getAndSaveCurrentUser = () => {
    this.firebaseProvider.getCurrentUser(this.uid).subscribe(res => {
      this.loadingProvider.dismiss();
      const user = res[0];
      this.storage.set("user_cabelomeu", user).then(() => {
        this.navCtrl.setRoot('slideCronogramaPage');
      });
    });
  }

  haveAccount = () => this.navCtrl.setRoot('LoginPage');
  abrirTermos = () => this.navCtrl.push('SobrePage');
}