import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { calendarioPage } from '../calendario/calendario';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  tipoCabelo = true;
  testePorosidade = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, private storage: Storage, 
    private formBuilder: FormBuilder,
  ) 
  {
    

  }
  Continuar(){   
    this.tipoCabelo = false;
    this.testePorosidade = true;
  }
  
  //Buscar dados do usuario no storage
 abrirCronograma(){ 
  this.storage.set('slideCompleto',true);
  this.navCtrl.setRoot('TabsPage')
}
}
