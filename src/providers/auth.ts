import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) {
  }
  //Criar usuario
  register = (data) => this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(data.email, data.pass)
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
  //Login
  login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.pass);
  sair = (data) => this.afAuth.auth.signOut();
}