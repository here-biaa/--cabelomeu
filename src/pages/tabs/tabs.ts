import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    homeTab = 'HomePage';
    calendarioTab = 'calendarioPage';
    temporizadorTab = 'TemporizadorPage';
    produtoTab = 'ProdutoPage';
    configuracoesTab = 'ConfiguracoesPage';
    selectTab = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }
}

