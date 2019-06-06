import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { ImagesUpload } from '../../providers/image-upload';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {
    name: '',
    email:'',
    pass:'',
    uid: '',
    avatar: '',
    cabelo:''
  };
  bigImg = null;
  smallImg = null;
  editarNome= false;
  editarEmail =false;
  @Input() cabelos:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public app: App,
    private camera: Camera,
    private storageImages: ImagesUpload,
    private db:AngularFireDatabase,
    public actionctrl:ActionSheetController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,

  ) {
    this.getCurrentUser();

  }
  alterarEmail(){
    this.editarEmail = true;
  }
  alterarNome(){
    this.editarNome = true;
  }

abrirModal() {
    let profileModal = this.modalCtrl.create(ModalPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }
 alterarSenha(){
   this.abrirModal();
  }
  
  //Atualizar a pagina
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Buscar dados do usuario no storage
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
  }

  //Salvar alterações do usuario
  save() {
    this.loadingProvider.present();
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.getAndSaveCurrentUser(this.user.uid);
        this.presentToast()
      })
  }


//quando o usuario salvar as alteraçoes vai aparecer
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Perfil atualizado com sucesso',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
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

  //sair
  logout() {
    this.app.getRootNav().setRoot('LoginPage');
  }

  //Subir imagem
  changeAvatar() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      cameraDirection: 1,
      targetWidth: 900,
      targetHeight: 900
    })
    .then(imageData => {
      let base64data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64data;
      //Get image size
      this.createThumbnail();
    }, error => {
    });
  }
  tirarFoto(){
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      cameraDirection: 0,
      targetWidth: 900,
      targetHeight: 900
    })
      .then(imageData => {
        let base64data = 'data:image/jpeg;base64,' + imageData;
        this.bigImg = base64data;
        //Get image size
        this.createThumbnail();
      }, error => {
      });

  }
  createThumbnail() {
    let load = this.loadingProvider;
    load.present()

    this.generateFromImage(this.bigImg, 1000, 1000, 100, data => {
      this.smallImg = data;
      let imgToUp = this.smallImg.split(',')[1];
      // console.log(imgToUp);
      this.storageImages.uploadPhoto(imgToUp, this.user.uid, 'Profile')
        .then((savedPicture) => {
          let storageRef = firebase.storage().ref('Images/' + 'Profile' + '/' + this.user.uid);
            storageRef.getDownloadURL()
                .then(url => {
                    load.dismiss();
                     this.user.avatar = url;
                });
        })
        .catch((err) => {
          load.dismiss()
        })
    });
  }

  generateFromImage(img, MAX_WIDTH, MAX_HEIGHT, quality, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();
    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl)
    }
    image.src = img;
  }
  deletarFoto(){
    this.user.avatar = null;
  }

//folha de açao com opçoes da foto de perfil//
  showactionsheet(){
    let actionsheet = this.actionctrl.create({
      title: 'Foto de perfil',
      buttons : [
        {
          text: 'Tirar foto para o perfil',
          icon: 'ios-camera-outline',
          handler: () => {
            this.tirarFoto()
          }
        },

        {
          text:'Selecionar foto de perfil',
          icon: 'ios-images-outline',
          handler: () => {
            this.changeAvatar()
          }
        },
        {
          text:'Remover foto',
          icon: 'ios-trash-outline',
          role:'destructive',
          handler: () => {
            this.deletarFoto()
          }
        },
        {
          text:'Cancelar',
          icon:'ios-close-circle-outline',
          role:'cancel',
          handler: () => {
            console.log("Hey cancelled sucessfully")
          }
        }
      ]
    })


    actionsheet.present();
  }

}
