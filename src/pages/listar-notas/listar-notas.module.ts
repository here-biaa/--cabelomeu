import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarNotasPage } from './listar-notas';

@NgModule({
  declarations: [
    ListarNotasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarNotasPage),
  ],
})
export class ListarNotasPageModule {}
