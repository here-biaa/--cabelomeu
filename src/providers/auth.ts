import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) {
  }

  //Criar usuario
  register = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.pass);
    
  //Login
  login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.pass);
}