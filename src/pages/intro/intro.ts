import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { calendarioPage } from '../calendario/calendario';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { App, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  user = {
    name: '',
    email: '',
    pass: '',
    uid: '',
    avatar: '',
    cabelo: '',
    cronograma:''
  };
  hidratacao = true;
  nutricao = true;
  reconstrucao = true;

  @ViewChild('slides') slides: Slides;
  
  tabs: any = '0';
  slide: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, private storage: Storage,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,


  ) {
    this.getCurrentUser();
  }

  Continuar() {
    this.loadingProvider.present();
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.getAndSaveCurrentUser(this.user.uid);
        this.slides.slideNext();
        this.hidratacao = true;
        this.nutricao = true;
        this.reconstrucao = true;


      })

    console.log(this.user)
  }
  CronogramaHidratacao(){
    this.nutricao= false;
    this.reconstrucao =false;
    this.hidratacao =true;
  }
  CronogramaNutricao() {
    this.nutricao = true;
    this.reconstrucao = false;
    this.hidratacao =false;
  }

  CronogramaReconstrucao() {
    this.nutricao = false;
    this.reconstrucao = true;
    this.hidratacao = false;
  }
  VoltarSlide(){
    this.slides.slidePrev();

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
  
  //Buscar dados do usuario no storage
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
  }
   abrirCronograma() {
    this.storage.set('slideCompleto', this.user);
        this.navCtrl.setRoot('TabsPage',
        {
          root:'calendarioTab'
      });
  }
}