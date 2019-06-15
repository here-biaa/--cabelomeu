import { Injectable } from "@angular/core";
import { AngularFirestore,AngularFirestoreCollection} from "angularfire2/firestore";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { firestore } from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class FirebaseProvider {
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  //Save user on firestore
  saveUser = data =>
    this.afs
      .collection("Users")
      .doc(data.$key)
      .set(data);

  //Create user on firestore
  postUser = data =>
    this.afs
      .collection("Users")
      .add(data);
  
  //Create order on firestore
  postOrder = data => this.afs.collection("Orders").add(data);

  //Get current user from uid
  getCurrentUser = uid => {
    const collection: AngularFirestoreCollection<any> = this.afs.collection(
      "Users",
      ref => ref.where("uid", "==", uid)
    );
    const collection$: Observable<any> = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  };
  deletarProdutos = data =>
    this.afs
      .collection("Produtos")
      .doc(data.$key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).
      catch(function (error) {
        console.error("Error removing document: ", error);
      });

  //Salvar produtos
  updateProdutos = data =>
    this.afs
      .collection("Produtos")
      .doc(data.$key)
      .set(data)

  //Criar produtos no firestore
  postProdutos = data =>
    this.afs
      .collection("Produtos")
      .add(data)
     

  //buscar produtos
  getProdutos = () => {
    const collection: AngularFirestoreCollection<any> = this.afs.collection(
      "Produtos"
    );
    const collection$: Observable<any> = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  deletarNotas = data =>
    this.afs
      .collection("Notas")
      .doc(data.$key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).
      catch(function (error) {
        console.error("Error removing document: ", error);
      });

  //Salvar produtos
  updateNotas = data =>
    this.afs
      .collection("Notas")
      .doc(data.$key)
      .update(data);

  //Criar produtos no firestore
  postNotas = data =>
    this.afs
      .collection("Notas")
      .add(data)


  //buscar produtos
  getNotas = () => {
    const collection: AngularFirestoreCollection<any> = this.afs.collection(
      "Notas"
    );
    const collection$: Observable<any> = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }

}