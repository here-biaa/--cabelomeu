import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesPage } from './configuracoes';

@NgModule({
  declarations: [
    ConfiguracoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesPage),
  ],
})
export class ConfiguracoesPageModule {}
