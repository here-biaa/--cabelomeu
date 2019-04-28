import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Slides
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { FirebaseProvider } from "../../providers/firebase";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-slideCronograma",
  templateUrl: "slideCronograma.html"
})
export class slideCronogramaPage {
  //slides
  @ViewChild(Slides) slides: Slides;
  
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
  ) 
  {
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

  inicioSlides(slide,) {
    this.slides.slideTo(slide, 1300, true);
    this.storage.set('slideCompleto',true);
    this.navCtrl.setRoot('LoginPage');

  }

}
