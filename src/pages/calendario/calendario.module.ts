import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { calendarioPage } from './calendario';

@NgModule({
  declarations: [
    calendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(calendarioPage),
  ],
})
export class calendarioPageModule {}
