import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarProdutosPage } from './cadastrar-produtos';

@NgModule({
  declarations: [
    CadastrarProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarProdutosPage),
  ],
})
export class CadastrarProdutosPageModule {}
