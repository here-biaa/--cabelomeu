import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EtapasCronoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etapas-crono',
  templateUrl: 'etapas-crono.html',
})
export class EtapasCronoPage {
  //paginas
  nutricao = false;
  hidratacao = true;
  reconstrucao = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtapasCronoPage');
  }
 
  
  mostrarReconstrucao() {

    if (this.reconstrucao = true){
      this.hidratacao = false;
      this.nutricao = false;

    }
    else
    this.reconstrucao = true;
    this.hidratacao = false;
    this.nutricao = false;

    }
  mostrarHidratacao() {
    this.hidratacao = true;
    this.reconstrucao = false;
    this.nutricao = false;
  }
  mostrarNutricao() {
    this.nutricao = true;
    this.hidratacao = false;
    this.reconstrucao = false;
  }
}
