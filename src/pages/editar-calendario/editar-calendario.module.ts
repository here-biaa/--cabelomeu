import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarCalendarioPage } from './editar-calendario';

@NgModule({
  declarations: [
    EditarCalendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarCalendarioPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class EditarCalendarioPageModule {}
