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
  };
  hidratacao = true;
  nutricao = true;
  reconstrucao = true;
  btnEnable;
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
  Liso(){
    this.user.cabelo = 'Liso';
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.loadingProvider.dismiss()

      })
    this.slides.slideNext();

}
  Ondulado(){
    this.user.cabelo ='Ondulado';
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.loadingProvider.dismiss()

      })
    this.slides.slideNext();


  }
  Cacheado(){
    this.user.cabelo = 'Cacheado';
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.loadingProvider.dismiss()

      })
    this.slides.slideNext();

    }
  Crespo(){
    this.user.cabelo = 'Crespo';
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.loadingProvider.dismiss()

      })
    this.slides.slideNext();

  }
  Transicao(){
    this.user.cabelo = 'Transicao';
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
           this.loadingProvider.dismiss()

      })
    this.slides.slideNext();

  }
  Salvar() {
    this.loadingProvider.dismiss();
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.getAndSaveCurrentUser(this.user);
        this.slides.slideNext();
        this.hidratacao = true;
        this.nutricao = true;
        this.reconstrucao = true;


      })

    console.log(this.user)
  }
  Continuar(){
    this.slides.slideNext();
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
    this.nutricao = true;
    this.reconstrucao = true;
    this.hidratacao = true;
 }
 Quiz(){
   this.Continuar()
 }
 App(){
   this.navCtrl.setRoot('TabsPage')
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
  
<<<<<<< HEAD
  getCurrentUser(user) {
=======
  //Buscar dados do usuario no storage
  getCurrentUser() {
>>>>>>> b5ee7cae4457fc75a1b16f626f7b7ac06ad353b7
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
        console.log(this.user)
      })
  }
   abrirCronograma() {
    this.navCtrl.setRoot('TabsPage')
  }
}