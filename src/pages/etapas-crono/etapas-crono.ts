import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-etapas-crono',
  templateUrl: 'etapas-crono.html',
})
export class EtapasCronoPage {
  @ViewChild('slides') slides:Slides;
  
  etapas = 0;
  //paginas
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
 selecionarTab(index){
  this.slides.slideTo(index);
  
}
 
  
}
