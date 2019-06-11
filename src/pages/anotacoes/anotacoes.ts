import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-anotacoes',
  templateUrl: 'anotacoes.html',
})
export class AnotacoesPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,

    )
  {
    this.buildForm();
    moment.locale('pt-br');
  
  }
  user = {
    uid: '',

  };
  notas = {
    pontas: '',
    volume: '',
    oleosidade:'',
    definicao:'',

  }

  buildForm() {
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      nota: ["", Validators.required]


    });
  }
 Salvar() {
    let data = {
      titulo: this.form.value.titulo,
      pontas: this.notas.pontas,
      oleosidade: this.notas.oleosidade,
      definicao: this.notas.definicao,
      volume: this.notas.volume,
      nota: this.form.value.nota,
      date: (moment().locale('pt-br').toDate().toDateString()),
      uid: this.user.uid

    };
    console.log(data);
    this.firebaseProvider.postNotas(data)
      .then(res => {
        console.log(res);
        this.loadingProvider.dismiss();
        this.presentToast();
        this.form.reset()
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnotacoesPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Nota adicionada com sucesso',
      duration: 3000,
      position: 'top'
    });
  }
}
