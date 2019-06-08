import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { calendarioPage } from '../calendario/calendario';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }
  

abrirCronograma(){ 
  this.storage.set('slideCompleto',true);
  this.navCtrl.setRoot('TabsPage')
}
}
