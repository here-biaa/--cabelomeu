import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FbLoginPage } from './fb-login';

@NgModule({
  declarations: [
    FbLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(FbLoginPage),
  ],
})
export class FbLoginPageModule {}
