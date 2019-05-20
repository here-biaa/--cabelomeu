import { IonicPageModule } from 'ionic-angular';
import { calendarioPage } from './calendario';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarController } from './calendar.controller';
import { IonicModule, ModalController } from 'ionic-angular';
import { CalendarService } from "./services/calendar.service";
import { CALENDAR_COMPONENTS } from "./components/index";

export function calendarController(modalCtrl: ModalController,
  calSvc: CalendarService) {
  return new CalendarController(modalCtrl, calSvc);
}

@NgModule({
  declarations: [
    calendarioPage,
    CALENDAR_COMPONENTS
  ],
  exports: CALENDAR_COMPONENTS,
  entryComponents: CALENDAR_COMPONENTS,

  imports: [
    IonicPageModule.forChild(calendarioPage),
  ],
  providers: [
    CalendarService,
    {
      provide: CalendarController,
      useFactory: calendarController,
      deps: [ModalController, CalendarService]
    }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class calendarioPageModule { }