import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { Insomnia } from "@ionic-native/insomnia/ngx";
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';


@IonicPage()
@Component({
  selector: 'page-temporizador',
  templateUrl: 'temporizador.html',
})
export class TemporizadorPage implements OnInit {
  user;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }
  runTimer: boolean;
  hasStarted: boolean;
  progress: any = 0;
  overallProgress: any = 0;
  percent: number = 0;
  radius: number = 100;
  hours: number = 1;
  minutes: number = 1;
  seconds: any = 10;
  timer: any = false;
  overallTimer: any = false;
  fullTime: any;
  countDownTimer: any = false;
  audio: any;
  timeLeft: any = {
    h: '00',
    m: '00',
    s: '00'
  };
  start: boolean = true;
  stop: boolean = false;
  resume: boolean = false;

  remainingTime = `${this.timeLeft.h}:${this.timeLeft.m}:${this.timeLeft.s}`;
  constructor(
    public navCtrl: NavController,
    private insomnia: Insomnia, private navigationBar: NavigationBar,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private storage: Storage,
    public platform: Platform,
    private streamingMedia: StreamingMedia
  ) {
    this.audio = new Audio();
    this.audio.src = "../../assets/audio/alarm.mp3";
    this.audio.load();


  }
  public ngOnInit = () => {
    let autoHide: boolean = true;
    this.navigationBar.setUp(autoHide);

  }
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  startTimer() {

    if (!this.countDownTimer) {
      setInterval(this.timer);
      setInterval(this.countDownTimer);
      this.progressTimer();

    }
    if (this.timer) {
      setInterval(this.timer);
      setInterval(this.countDownTimer);
    }
    if (!this.overallTimer) {
      this.progressTimer();
      this.insomnia.keepAwake()
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.hours = timeSplit[0];
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    let secondsLeft = totalSeconds;
    let forwardsTimer = () => {
      if (this.percent == this.radius)
        clearInterval(this.timer)
      this.percent = Math.floor((this.progress / totalSeconds) * 100)
      ++this.progress;

    }
    let backwardsTimer = () => {
      if (secondsLeft >= 0) {
        this.timeLeft.h = Math.floor(secondsLeft / 3600)
        this.timeLeft.m = secondsLeft - ((3600 * this.timeLeft.h) / 60)


        this.timeLeft.m = Math.floor(secondsLeft / 60)
        this.timeLeft.s = secondsLeft - (this.timeLeft.h * 3600) - (60 * this.timeLeft.m)


        this.remainingTime = `${this.pad(this.timeLeft.h, 2)}:${this.pad(this.timeLeft.m, 2)}:${this.pad(this.timeLeft.s, 2)}`
        secondsLeft--;



      }
      else
      this.audio.play();
      this.audio.loop = true;
     }

    // run once when clicked
    forwardsTimer()
    backwardsTimer()
    // timers start 1 second later
    this.countDownTimer = setInterval(backwardsTimer, 1000)
    this.timer = setInterval(forwardsTimer, 1000)


  }

  resumeTimer() {
    clearInterval(this.countDownTimer);
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.audio.pause();
    this.audio = null;

    this.countDownTimer = false;
    this.overallTimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    }
    this.timeLeft = {
      h: '00',
      m: '00',
      s: '00'
    }

    this.remainingTime = `${this.pad(this.timeLeft.h, 2)}:${this.pad(this.timeLeft.m, 2)}:${this.pad(this.timeLeft.s, 2)}`;
  }

  stopTimer() {
    clearInterval(this.countDownTimer);
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.audio.pause();
    this.AlertConfirm()

    
  }
  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = now - countDownDate.getTime();

      // Time calculations for hours, minutes and seconds

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  updateMyDate($event) {
  }
  //Atualizar o usuario no local storage
  getAndSaveCurrentUser(uid) {
    this.firebaseProvider.getCurrentUser(uid)
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        let user = res[0];
        this.storage.set('user_cabelomeu', user);
      })
  }
  PlayAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('foi') },
      errorCallback: () => { console.log('err') },
      initFullscreen: false,
    }
    this.streamingMedia.playAudio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3', options);

  }
  stopAudio() {
    this.streamingMedia.stopAudio()
  }
   async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      title: 'Hora de retirar o produto',
      message: 'Fim do tempo',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

}