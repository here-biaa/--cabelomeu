import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FirebaseProvider } from '../../providers/firebase';
import { AuthProvider } from '../../providers/auth';
import { Usuario } from '../model/usuario';
import { LoadingProvider } from "../../providers/loading";
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-fb-login',
  templateUrl: 'fb-login.html',
})
export class FbLoginPage {
  FB_APP_ID: number = 641501869636135;
  uid;
  user:any;
  constructor(
    public loadingController: LoadingController,
    private facebook: Facebook, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private authProvider: AuthProvider,
    private storage: Storage,
    private loadingProvider: LoadingProvider,
    private http:HttpClient
    ){}
   
  //método para chamar api do facebook e salvar no banco o usuario    
  FbLogin(): Promise<any> {
    return this.facebook.login(['email','public_profile'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
          });
      }).catch((error) => {
        console.log(error);
       });
  }
  getCreateUser= (access_token:string) => {
    let url = 'https://graph.facebook.com/me?fields=id,name,email,password&access_token=' + access_token;
    this.firebaseProvider.getCurrentUser(url).subscribe(data =>{
      this.loadingProvider.dismiss();
      const user = data[0];
      this.storage.set("facebook_user", user).then(() => {
        this.navCtrl.setRoot("TabsPage");
        console.log(user);
      });
    });
  }


ionViewDidLoad() {
    console.log('ionViewDidLoad FbLoginPage');
  }

}
