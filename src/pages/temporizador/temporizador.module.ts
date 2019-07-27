import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemporizadorPage } from './temporizador';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NativeAudio } from '@ionic-native/native-audio';

@NgModule({
  declarations: [
    TemporizadorPage,
   ],
  imports: [
    IonicPageModule.forChild(TemporizadorPage),
    NgCircleProgressModule.forRoot({
    }),
  ],
  providers:[
    //NativeAudio
  ]
  
})
export class TemporizadorPageModule {
  
  
}
