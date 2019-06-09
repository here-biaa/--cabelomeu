import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacoesPage } from './informacoes';

@NgModule({
  declarations: [
    InformacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacoesPage),
  ],
})
export class InformacoesPageModule {}
