import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {
  inicio = true;
  termos= false;
  politica=false;
  versao = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobrePage');
  }
  abrirPolitica(){
    this.inicio=false;
    this.termos = false;
    this.versao = false;
    this.politica = true;
  
  }
  abrirTermos(){
    this.inicio = false;
    this.termos = true;
    this.versao = false;
    this.politica = false;

  }
  abrirVersao(){
    this.inicio = false;
    this.termos = false;
    this.versao = true;
    this.politica = false;

  }
}
