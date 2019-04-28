import { Component, ErrorHandler } from "@angular/core";
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
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: "page-create-account",
  templateUrl: "create-account.html"
})
export class CreateAccountPage implements ErrorHandler{
   handleError(error: any): void {
    throw new Error("Method not implemented.");
  }

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
  // Validação do formulário de cadastro
  buildForm() {
    this.validacao_form = this.formBuilder.group({
      name: ["", Validators.required],
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
    }, (validacao_form: FormGroup) => {
      return PasswordValidator.areEqual(validacao_form);
    });
  }

  register() {
    this.loadingProvider.present().then(() => {
      let data = this.validacao_form.value;
      /* Puxando do provedor o metodo de registro*/
      this.authProvider

        .register(data)

        //Success
        .then(res => {
          this.uid = res.user.uid;
          this.createUserOnFirestore();

          let user = firebase.auth().currentUser;
          user.sendEmailVerification();
          console.log("ok")

          this.loadingProvider.dismiss();
          this.alertCtrl.create({
            title: "Verifique seu email",
            subTitle: "Enviamos um e-mail de autenticação para você.",
            buttons: ["Ok"]
          }).present();
        })
        //Error
        .catch((err) => {
          console.log(err)
          this.loadingProvider.dismiss();
          this.alertCtrl.create({
            title: "Ops",
            subTitle: "Enviamos um e-mail de autenticação para você.",
            buttons: ["Ok"]
          }).present();
        });
    });
  }

  //Criando o usuario no firebase
  createUserOnFirestore = () => {
    const data = {
      name: this.validacao_form.value.name,
      email: this.validacao_form.value.email,
      pass: this.validacao_form.value.pass,
      uid: this.uid
    };

    this.firebaseProvider.postUser(data).then(res => {
      this.getAndSaveCurrentUser();
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
  /**
   Se o usuario ja tiver uma conta ele retornará a pag de login
   */
  haveAccount = () => this.navCtrl.setRoot('LoginPage');
}
