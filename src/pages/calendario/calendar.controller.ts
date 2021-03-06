import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalOptions, CalendarModalOptions, DayConfig } from './calendar.model'
import { CalendarModal } from "./components/calendar.modal";
import { CalendarService } from './services/calendar.service';

@Injectable()
export class CalendarController {

  constructor(public modalCtrl: ModalController,
              public calSvc: CalendarService) {
  }

  /**
   * @deprecated
   * @param {CalendarModalOptions} calendarOptions
   * @param {ModalOptions} modalOptions
   * @returns {any}
   */
  openCalendar(calendarOptions: CalendarModalOptions, modalOptions: ModalOptions = {}): Promise<{}> {

    let options = this.calSvc.safeOpt(calendarOptions);
    let calendarModal = this.modalCtrl.create(CalendarModal, Object.assign({
      options: options
    }, options), modalOptions);

    calendarModal.present();

    return new Promise((resolve, reject) => {

      calendarModal.onDidDismiss((data: {}) => {
        if (data) {
          resolve(data);
        } else {
          reject('cancelled')
        }
      });
    });

  }
/*  loadEvents() {
    let eventsSource: DayConfig[] = [];

    this.calSvc.getEvents()
      .subscribe(response => {
        response.forEach(event => {
          eventsSource.push({
            date: event.startTime,
            marked: true,
            subTitle: event.numEvents < 5 ? "*".repeat(event.numEvents) : "****"
          });
        });

        this.options = {
          ...this.options,
          daysConfig: eventsSource
        };
      });
  }*/
}
