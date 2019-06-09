import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams,
   ModalController, ViewController, ToastController, ActionSheetController, Events } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarModalOptions, DayConfig, CalendarOptions, CalendarComponentOptions, Cronograma } from './calendar.model';
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';
@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class calendarioPage implements AfterViewInit,OnInit{
  btnHidratacao= true;
  _daysConfig;
  visibilidade = false;
  user;
  produtos;
  constructor(
    public evt:Events,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private storage: Storage,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController) 
  { 
    moment.locale('pt-br'); 
    this.getCurrentUser();
    this.getProdutos();
    this.produtos = this.navParams.get("produtos");


  }
  ngAfterViewInit(){
    
    //conexao ocom banco pra descobrir o tipo
    /*const tipo = 1;

    if(tipo == 1){
      this.dateMulti = []
    }*/
  }
  ngOnInit(){
  }
  dateMulti: string[] = [moment().toDate().toDateString(), moment().add(1, 'days').toDate().toDateString(), moment().add(2, 'days').toDate().toDateString()];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    daysConfig: this._daysConfig
  };

  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  //Listar produtos
  getProdutos = () => {
    this.firebaseProvider.getProdutos().subscribe(res => {
      this.loadingProvider.dismiss();
      this.produtos = res;
      
    });
  }

  _toastWrap(event: string, payload: {}) {
    let toast = this.toastCtrl.create({
      message: `${event}: ${JSON.stringify(payload, null, 2)}`,
      duration: 2000,
    });
    toast.present()
    
  }
  
  onChange($event) {
    console.log('onChange', $event);
  }
  
  onSelect($event) {
    console.log('onSelect', $event);
    if ($event.cssClass == 'hidratacao')
    {
      this.produtos.tipo = 'hidratcao';
      console.log('tipooo')
    }
    this.visibilidade = true;
    console.log(this.produtos)
    }
  onHidratacao($event) {
    console.log('onHidratacao', $event);
  }

  onSelectStart($event) {
    console.log('onSelectStart', $event);
    this.visibilidade = true;

  }

  onSelectEnd($event) {
    console.log('onSelectEnd', $event);
    this.visibilidade = false;
    this._toastWrap('onSelectEnd', $event)
  }

  monthChange($event) {
    console.log('monthChange', $event);
    this._toastWrap('monthChange', $event)
  }
  CadastrarProduto(){ 
    this.navCtrl.push('CadastrarProdutosPage')
  }
  Temporizador(){
    this.navCtrl.push('TemporizadorPage')
  }
  EditarCronograma(){
    this.navCtrl.push('slideCronogramaPage')
  }
  abrirAnotacoes(){
    this.navCtrl.push('AnotacoesPage')
  }
}




