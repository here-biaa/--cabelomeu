import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from "../../providers/firebase";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  user;

  //paginas
  inicio =false;
  conteudo =true;
  //slides
  public lottieConfig;
  lottieConfig2;
  lottieConfig3: Object;
  private anim;
  anim2;
  anim3: any;
  private animationSpeed: number = 1;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController

    ) {
    //Slides
    this.lottieConfig = {
      path: 'assets/lottie/man_and_chat.json',
      renderer: 'canvas',
      autoplay: true,
      loop: false
    }
    this.lottieConfig2 = {
      path: 'assets/lottie/man_and_pay_with_credit_card.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
    this.lottieConfig3 = {
      path: 'assets/lottie/man_and_travel.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
  }
  handleAnimation(anim: any) {
    this.anim = anim;
  }
  handleAnimation2(anim2: any) {
    this.anim2 = anim2;

  }
  handleAnimation3(anim3: any) {
    this.anim3 = anim3;

  }
  slideChanged() {

    let currentIndex = this.slides.getActiveIndex();

    if (currentIndex === 0) {
      this.anim.setSpeed(2);
      this.anim.play();
      this.anim2.stop();
      this.anim3.stop();
    }

    if (currentIndex === 1) {
      this.anim2.setSpeed(2.2);
      this.anim2.play();
      this.anim3.stop();
      this.anim.stop();
    }

    if (currentIndex === 2) {
      this.anim3.setSpeed(2);
      this.anim3.play();
      this.anim2.stop();
      this.anim.stop();

    }

  }
  inicioSlides(slide) {
    this.inicio = false;
    this.conteudo = true; 
    this.slides.slideTo(slide, 1000, true);
    this.getAndSaveCurrentUser(this.user.uid);
   }
  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  //Get current user data
  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  //Atualizar o usuario no local storage
  getAndSaveCurrentUser(uid) {
    this.firebaseProvider.getCurrentUser(uid)
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        let user = res[0];
        this.storage.set('user_cabelomeu', user);
      })
  }
//-----------HOME-----------//
abrirHidratacao = () => this.navCtrl.push('EtapasCronoPage');
abrirNutricao = () => this.navCtrl.push('EtapasCronoPage');
abrirReconstrucao = () => this.navCtrl.push('EtapasCronoPage');
abrirCronograma = () => this.navCtrl.push('calendarioPage');
abrirPerfil = () => this.navCtrl.push('ProfilePage'); 
abrirProdutos = () => this.navCtrl.push('CadastrarProdutosPage'); 
abrirTemporizador = () => this.navCtrl.push('TemporizadorPage'); 
}
