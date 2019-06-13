import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';
import { Camera } from '@ionic-native/camera';
import { ImagesUpload } from '../../providers/image-upload';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {
  listagem = true;
  editar= false;
  produtos;
  bigImg = null;
  smallImg = null;
  amount = 0;
  user = {
    uid: '',

  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    public actionctrl:ActionSheetController,
    private camera: Camera,
    private storageImages: ImagesUpload,
  

  ) {
    this.produtos = this.navParams.get("produtos");

 }
  async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Deseja apagar esse produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Apagar',
          handler: () => {
            this.apagar()
          }
        }
      ]
    });

    await alert.present();
  }
  openOptions(){
    let actionsheet = this.actionctrl.create({
      title: 'Produto',
      buttons : [
        {
          text: 'Editar',
          icon: 'md-create',
          handler: () => {
            this.Editar()
          }
        },
        {
          text:'Excluir',
          icon: 'ios-trash',
          role:'destructive',
          handler: () => {
            this.AlertConfirm()
          }
        }
      ]
    })
    actionsheet.present();
  }
  FolhadeAcoes(){
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
              this.produtos.imgProduto = url;
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

 apagar(){
   this.firebaseProvider.deletarProdutos(this.produtos)
     .then(res => {
       this.navCtrl.setRoot('ProdutoPage')
     });
 
  }
  Editar(){
    this.editar = true;
    this.listagem = false;
  }
  EditarFoto(){

  }
  Atualizar(produtos){
    let data = produtos
    this.firebaseProvider.updateProdutos(data)
      .then(res => {
        console.log(data)
        console.log(res)
        this.loadingProvider.dismiss();
        this.navCtrl.setRoot('ProdutoPage')
     });
    
  }
}