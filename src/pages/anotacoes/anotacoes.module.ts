import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotacoesPage } from './anotacoes';

@NgModule({
  declarations: [
    AnotacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(AnotacoesPage),
  ],
})
export class AnotacoesPageModule {}
