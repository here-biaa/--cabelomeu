import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-editar-calendario',
  templateUrl: 'editar-calendario.html',
})
export class EditarCalendarioPage {
produtos;
adicionados;
user={
  uid:''
}
date;
day;
inicio = true;
acharProd= false;
produtosAtrelados = false;
notasAtreladas = false;
acharNota = false;
btn=true;
btnNotas = true;
anotacoes;
add;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private toastCtrl: ToastController,
   
    ) 
  {
    moment.locale('pt-br');
    this.day = moment().format('dddd');  
    this.date = moment().format("MMM Do YY");              
    this.getProdutos();
    this.getNotas();
  }

  abreDetalhe = produtos => this.navCtrl.push("DetalhesProdutoPage", { produtos });

 
  //Listar produtos

  getProdutos = () => {
    this.loadingProvider.dismiss();
    this.firebaseProvider.getProdutos()
      .subscribe(resp => {
        this.produtos = resp;

        console.log(resp)
      })
  }
  //Listar notas
  getNotas = () => {
    this.firebaseProvider.getNotas()
      .subscribe(res => {
        this.anotacoes = res;
      });
  }
  AddProduto(){
    this.inicio=false;
    this.acharNota= false;
    this.acharProd = true;
  }
  AddNota() {
    this.inicio = false;
    this.acharNota = true;
    this.acharProd = false;
  
  }
 
  Prod(item:any){
    this.acharProd = false;
    this.inicio = true;
    this.produtosAtrelados = true
    this.btn=false;
    this.adicionados = item;
   }
  Nota(item: any) {
    this.acharNota = false;
    this.inicio = true;
    this.notasAtreladas = true;

    this.btnNotas = false;
    this.add = item;
  }
  Salvar(){
    this.loadingProvider.dismiss()
      .then(res => {
        console.log(res);
        this.presentToast()
        this.navCtrl.setRoot('calendarioPage');
  });
     
}
  CadastrarProduto() {
    this.navCtrl.push('CadastrarProdutosPage')
  }
  Temporizador() {
    this.navCtrl.push('TemporizadorPage')
  }
  EditarCronograma() {
    this.navCtrl.push('slideCronogramaPage')
  }
  abrirAnotacoes() {
    this.navCtrl.push('AnotacoesPage')
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Alterações adicionadas com sucesso',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarCalendarioPage');
  }

}
