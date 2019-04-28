import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { slideCronogramaPage } from './slideCronograma';
import { LottieAnimationViewModule } from 'ng-lottie';
@NgModule({
  declarations: [
    slideCronogramaPage,
  ],
  imports: [
    IonicPageModule.forChild(slideCronogramaPage),
    LottieAnimationViewModule

  ],
})
export class slideCronogramaPageModule {
  login = false;

  inicio = true;

}
