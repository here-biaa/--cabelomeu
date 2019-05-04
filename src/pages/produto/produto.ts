import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';
@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  lista:any[] = [
    {img:"imgProduto1.png",titulo:"Pinga",tipo:"Nutrição",marca:"lola",descricao:"não liberado"},
    {img:"imgProduto2.png",titulo:"Divino Potão",tipo:"Reconstrução",marca:"skala",descricao:"liberado para low pow"},
    {img:"imgProduto3.png",titulo:"S.O.S cachos",tipo:"Hidratação",marca:"Salon Line",descricao:"liberado para low pow"}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 abreDetalhe(item:any){
    this.navCtrl.push(DetalhesProdutoPage,{produto:item});
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
  }

}
