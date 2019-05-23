import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarModalOptions, DayConfig, CalendarOptions, CalendarComponentOptions } from './calendar.model';


import { CalendarModal } from './components/calendar.modal';
@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class calendarioPage  {
  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) 
  { 
    moment.locale('pt-br'); 
  }
  cronograma = true;
  templateCronograma = false;

  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  events:DayConfig={
    date : new Date (2019,5,30),
    marked:true,
    cssClass: 'hidratacao',
    subTitle:'H'
}
  
    
  optionsMulti: CalendarOptions = {
    pickMode: 'multi',
   };

  _toastWrap(event: string, payload: {}) {
    let toast = this.toastCtrl.create({
      message: `${event}: ${JSON.stringify(payload, null, 2)}`,
      duration: 2000,
    });
    toast.present()
    
  }


  onChange($event) {
    console.log('onChange', $event);
    this._toastWrap('onChange', $event)
  }

  onSelect($event) {
    console.log('onSelect', $event);
    console.log('day' , this.events )

    this._toastWrap('onSelect', $event)
  }

  onSelectStart($event) {
    console.log('onSelectStart', $event);
    this._toastWrap('onSelectStart', $event)
  }

  onSelectEnd($event) {
    console.log('onSelectEnd', $event);
    this._toastWrap('onSelectEnd', $event)
  }

  monthChange($event) {
    console.log('monthChange', $event);
    this._toastWrap('monthChange', $event)
  }
  CronogramaCabelomeu(){
    this.cronograma = false;
    this.templateCronograma = true;

  }
  hidratacao($event){
    console.log('hidratacao',$event);
    this._toastWrap('hidratacao', $event)
  
  }
}




