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
  visibilidade = false;
  user;
  etapa:string;
  produtos = false;
  cor:string = '#F2D7EE';
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
  ngOnInit(){
  }
  tipo = 1;
  _daysConfig: DayConfig[] = [];
  
  dateMulti: string[] = [];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    daysConfig: this._daysConfig
   };

  ngAfterViewInit() {
    //conexao ocom banco pra descobrir o tipo
    for (let i = 0; i < 31; i++) {
      //primeira semana do crnograma
      this._daysConfig.push({
        date: new Date(2019, 5, 17),
        subTitle:   'H',
        marked: true,
        cssClass: 'hidratacao',
      
      }
      )
        this._daysConfig.push({
          date: new Date(2019, 5, 20),
          subTitle: 'N',
          marked: true,
          cssClass: 'nutricao',
        
        }),
        this._daysConfig.push({
          date: new Date(2019, 5, 22),
          subTitle: 'H',
          marked: true,
          cssClass: 'hidratacao'

        }),
        //segunda semana do crnograma

      this._daysConfig.push({
        date: new Date(2019, 5, 24),
        subTitle:   'N',
        marked: true,
        cssClass: 'nutricao'
      }),
        this._daysConfig.push({
          date: new Date(2019, 5, 27),
          subTitle: 'H',
          marked: true,
          cssClass: 'hidratacao'

        }),
        this._daysConfig.push({
          date: new Date(2019, 5, 29),
          subTitle: 'R',
          marked: true,
          cssClass: 'reconstrucao',
          produtos:true
        }),
        //terceira semana do crnograma

        this._daysConfig.push({
          date: new Date(2019, 6, 1),
          subTitle: 'H',
          marked: true,
          cssClass: 'hidratacao',
         
        }),
        this._daysConfig.push({
          date: new Date(2019, 6, 4),
          subTitle: 'N',
          marked: true,
          cssClass: 'nutricao',
          })
        this._daysConfig.push({
        date: new Date(2019, 6, 6),
        subTitle:   'H',
        marked: true,
        cssClass: 'hidratacao',
         
      }),
      //ultima semana do crnograma
        this._daysConfig.push({
          date: new Date(2019, 6, 8),
          subTitle: 'N',
          marked: true,
          cssClass: 'nutricao'
        }),
        this._daysConfig.push({
          date: new Date(2019, 6, 11),
          subTitle: 'H',
          marked: true,
          cssClass: 'hidratacao'

        })
      this._daysConfig.push({
        date: new Date(2019, 6, 13),
        subTitle:   'R',
        marked: true,
        cssClass: 'reconstrucao',
        produtos: true
      })
    }

    /*if(this.tipo == 1) {
      this.dateMulti = [
      moment().toDate().toDateString(), 
      moment().add(1, 'days').toDate().toDateString(), 
      moment().add(2, 'days').toDate().toDateString(),

    ]}*/
  }
    
  

  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  //Listar produtos
  _toastWrap(event: string, payload: {}) {
    let toast = this.toastCtrl.create({
      message: `${event}: ${JSON.stringify(payload, null, 2)}`,
      duration: 2000,
    });
    toast.present()
    
  }
  getProdutos = () => {
    this.firebaseProvider.getProdutos()
      .subscribe(res => {
        this.loadingProvider.dismiss();
        this.produtos = res;
      });
  }
  onChange($event) {
    console.log('onChange', $event);
  }
  
  onSelect($event) {
    console.log('onSelect', $event);
    this.visibilidade = true;
 
    }
  onHidratacao($event) {
    console.log('onHidratacao', $event);
  }

  onSelectStart($event) {
    console.log('onSelectStart', $event);
    this.visibilidade = false;    
  }

  onSelectEnd($event) {
    console.log('onSelectEnd', $event);
    this.visibilidade = false;
  }

  monthChange($event) {
    console.log('monthChange', $event);
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




