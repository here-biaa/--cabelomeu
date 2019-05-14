import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { ImagesUpload } from '../../providers/image-upload';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cadastrar-produtos',
  templateUrl: 'cadastrar-produtos.html',
})
export class CadastrarProdutosPage {
bigImg = null;
smallImg = null;
  produto = {
    nome:'',
    marca:'',
    obs:'',
    tipo:'',
    imgProduto:'',
    uid: ''
 
    };
  user ={
  };
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public app: App,
    private camera: Camera,
    private storageImages: ImagesUpload,
    ) {
    this.getCurrentUser();
  }


  //Get current user data
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
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
    this.loadingProvider.present();
    this.criarProdutoFirebase();
    
  }

  imagemProduto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      targetWidth: 900,
      targetHeight: 900
    }).then(imageData => {
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
      this.storageImages.uploadPhoto(imgToUp, this.produto.imgProduto, 'Produto')
        .then((savedPicture) => {
          let storageRef = firebase.storage().ref('Images/' + 'Produto' + '/' + this.produto.imgProduto);
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
  //Criando o usuario no firebase
  criarProdutoFirebase = () => {
    const data = {
      nome:         this.produto.nome,
      marca:        this.produto.marca,
      obs:          this.produto.obs,
      tipo:         this.produto.tipo,
      imgProduto:   this.produto.imgProduto,
      uid:          this.produto.uid

    };

    this.firebaseProvider.postProdutos(data).then(res => {
      console.log('foi');
      this.loadingProvider.dismiss();
      this.alertCtrl.create({
        title: "Produto Cadastrado",
        subTitle: "Seu produto foi cadastrado com sucesso.",
        buttons: ["Ok"]
      }).present();

    });
  }
  
}
