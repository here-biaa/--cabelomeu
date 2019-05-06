import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import{CalendarComponentOptions} from '../calendario/calendar.model';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class calendarioPage {
  date: string[] ; 
  options: CalendarComponentOptions = {
    from: new Date (moment().format()),
  };

  constructor(public modalCtrl: ModalController) {
    moment.locale('pt-br'); 
  }

  onChange($event) {
    console.log($event)
  }
}
