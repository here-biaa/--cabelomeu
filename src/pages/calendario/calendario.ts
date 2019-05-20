import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarModalOptions, DayConfig } from './calendar.model';
import { CalendarModal } from './components/calendar.modal';
@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class calendarioPage  {
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  
  
  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) { moment.locale('pt-br') }

 

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
    this._toastWrap('onSelect', $event)
  }

  
}




