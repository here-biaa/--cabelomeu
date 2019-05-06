import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { calendarioPage } from './calendario';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import { CalendarComponent } from './calendar';
import { CalendarService } from './calendar.service';
import { initPositionScrollComponent } from './init-position-scroll';

@NgModule({
  declarations: [
    calendarioPage,
    MonthViewComponent, 
    WeekViewComponent, 
    DayViewComponent, 
    CalendarComponent, 
    initPositionScrollComponent
  ],
  imports: [
    IonicPageModule.forChild(calendarioPage),
  
  ],
  exports: [CalendarComponent],
  entryComponents: [CalendarComponent]
})
export class calendarioPageModule {}
