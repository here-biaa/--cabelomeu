import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarModalOptions, DayConfig, CalendarOptions, CalendarComponentOptions } from './calendar.model';


import { CalendarModal } from './components/calendar.modal';
@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class calendarioPage  {
  btnEditar = true;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    private toastCtrl: ToastController, 
    public actionSheetController: ActionSheetController) 
  { 
    moment.locale('pt-br'); 
  }
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
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
    this.btnEditar = true; 
  }
  
  onSelect($event) {
    console.log('onSelect', $event);
    this.presentActionSheet()
    }

  onSelectStart($event) {
    console.log('onSelectStart', $event);
  }

  onSelectEnd($event) {
    console.log('onSelectEnd', $event);
    this._toastWrap('onSelectEnd', $event)
  }

  monthChange($event) {
    console.log('monthChange', $event);
    this._toastWrap('monthChange', $event)
  }
   presentActionSheet() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Meu cronograma',
        role: 'destructive',
        icon: 'calendar',
        handler: () => {
          this.EventosCalendar()
        }
      }/*, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }*/]
    });
    actionSheet.present();
  }
  EventosCalendar(){
    this.navCtrl.push('slideCronogramaPage')
  }
}




