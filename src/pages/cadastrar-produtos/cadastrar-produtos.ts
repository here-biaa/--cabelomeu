import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { ImagesUpload } from '../../providers/image-upload';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-cadastrar-produtos',
  templateUrl: 'cadastrar-produtos.html',
})
export class CadastrarProdutosPage {
form: FormGroup;
bigImg = null;
smallImg = null;
amount = 0;

  user = {
    uid: '',
    
  };
  produto ={
    obs: '',
    imgProduto: [],
    id:''
  }
  produtos=[];
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public actionctrl: ActionSheetController,
    public app: App,
    private camera: Camera,
    private storageImages: ImagesUpload,
    ) {
    this.getCurrentUser();
    this.getProdutos();
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      marca: ["", Validators.required],
      tipo: ["", Validators.required]
    });
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
        this.produto = this.produto;
      })
  }
  getProdutos() {
    this.storage.get('user_cabelomeu')
      .then((res) => {
        this.produtos = res;
        this.update();
      })
    }
  
    update() {
      let i = 0;
      for (i; i < this.produtos.length; i++) {
        let price = parseFloat(this.produtos[i].produto);
        this.amount = this.amount + this.produto['imgProduto' + 'obs' ]
      }
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

  //Salvar alterações do usuario
  cadastrar() {
    let data = {
      nome: this.form.value.nome,
      marca: this.form.value.marca,
      obs: this.produto.obs,
      tipo: this.form.value.tipo,
      imgProduto: this.produto.imgProduto,
      uid: this.user.uid

    };
    console.log(data);
    this.firebaseProvider.postProdutos(data)
    .then(res => {
      console.log(res);
      this.loadingProvider.dismiss();
      this.presentToast();
      this.update();
      this.form.reset()
    });
}
//quando cadastrar o produto aparece 
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Produto cadastrado',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
 
  imagemProduto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      targetWidth: 600,
      targetHeight: 600
    }).then(imageData => {
      let base64data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64data;
      //Get image size
      this.createThumbnail();
    }, error => {
    });
  }
  tirarFoto() {
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
      this.storageImages.uploadPhoto(imgToUp, this.user.uid, 'Produto')
        .then((savedPicture) => {
          let storageRef = firebase.storage().ref('Images/' + 'Produto' + '/' + this.user.uid);
          storageRef.getDownloadURL()
            .then(url => {
              load.dismiss();
              this.produto.imgProduto = url;
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
  

  FolhaDeAcoes() {
    let actionsheet = this.actionctrl.create({
      title: 'Adicionar Foto',
      buttons: [
        {
          text: 'Tirar foto do produto',
          icon: 'ios-camera-outline',
          handler: () => {
            this.tirarFoto()
          }
        },

        {
          text: 'Adicionar foto da galeria',
          icon: 'ios-images-outline',
          handler: () => {
            this.imagemProduto()
          }
        }
        
      ]
    })


    actionsheet.present();
  }

}
