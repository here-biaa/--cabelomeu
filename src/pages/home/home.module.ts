import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    LottieAnimationViewModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
