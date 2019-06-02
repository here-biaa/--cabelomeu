import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-etapas-crono',
  templateUrl: 'etapas-crono.html',
})
export class EtapasCronoPage implements OnInit {
  nutricao = false;
  hidratacao = true;
  reconstrucao = false;

  @ViewChild('slides') slides:Slides;
  @Input() etapas : any; 
  
  //paginas
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
 selecionarTab(index){
  this.slides.slideTo(index);
  
}
  ngOnInit() {
    console.log(this.etapas);
  }
 
  
}
