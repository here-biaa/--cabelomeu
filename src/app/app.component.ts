import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
  ) {
   
    this.storage.get('user_cabelomeu')
    .then((user) => {
      if (user) this.rootPage = 'TabsPage';
      else this.rootPage = 'slideCronogramaPage';
    });
    
    platform.ready().then(() => {
      this.storage.get('slideCompleto')
        .then((result) => {
          if (result) this.rootPage = 'LoginPage';
          else 
          this.rootPage = 'slideCronogramaPage';
          this.storage.set('slideCompleto',true);
        });

      this.storage.get('facebook_user')
        .then((data) => {
          if (data) this.rootPage = 'TabsPage';
          else this.rootPage = 'LoginPage';
        });

      setTimeout(() => {
        splashScreen.hide();
      });
      statusBar.styleDefault();

    });
 
  }
}

