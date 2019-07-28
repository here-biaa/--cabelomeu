
import * as firebase from 'firebase';
export const firebaseConfig = {
    apiKey: "AIzaSyDU8l409qd4ws0YAUaB0bRzGEjU8rxclu8",
    authDomain: "cabelomeuofc.firebaseapp.com",
    databaseURL: "https://cabelomeuofc.firebaseio.com",
    projectId: "cabelomeuofc",
    storageBucket: "cabelomeuofc.appspot.com",
    messagingSenderId: "916456321853"
 }
 // Ativar dados off-line do firebase
 firebase.initializeApp(firebaseConfig);
