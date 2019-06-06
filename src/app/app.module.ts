import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LottieAnimationViewModule } from 'ng-lottie';
import { CommonModule } from '@angular/common';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera';

//Calendario
import * as moment from 'moment';

//Temporizador
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';



//Firebase config
import { firebaseConfig } from '../configs/firebase';

//Providers
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth';
import { ImagesUpload } from '../providers/image-upload';
import { FirebaseProvider } from '../providers/firebase';
import { LoadingProvider } from '../providers/loading';
import { IonicStorageModule } from '@ionic/storage';

//Pages
import { LoginPageModule } from '../pages/login/login.module';
import { CreateAccountPageModule } from '../pages/create-account/create-account.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ProductPageModule } from '../pages/product/product.module';
import { FbLoginPageModule } from '../pages/fb-login/fb-login.module';
import { HomePageModule } from '../pages/home/home.module';
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { SobrePageModule } from '../pages/sobre/sobre.module';
import { ProdutoPageModule } from '../pages/produto/produto.module';
import { EtapasCronoPageModule } from '../pages/etapas-crono/etapas-crono.module';
import { TemporizadorPageModule } from '../pages/temporizador/temporizador.module';
import { CadastrarProdutosPageModule } from '../pages/cadastrar-produtos/cadastrar-produtos.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { DetalhesProdutoPageModule } from '../pages/detalhes-produto/detalhes-produto.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ModalPageModule } from '../pages/modal/modal.module';
@NgModule({
  declarations: [
    MyApp,
    ],
  imports: [
    //Pages
    LoginPageModule,
    CreateAccountPageModule,
    TabsPageModule,
    ProductPageModule,
    FbLoginPageModule,
    HomePageModule,
    ConfiguracoesPageModule,
    SobrePageModule,
    ProdutoPageModule,
    EtapasCronoPageModule,
    TemporizadorPageModule,
    CadastrarProdutosPageModule,
    ProfilePageModule,
    DetalhesProdutoPageModule,
    IntroPageModule,
    ModalPageModule,

    //Calendario
    //Outros
    CommonModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LottieAnimationViewModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    FirebaseProvider,
    AngularFireDatabase,
    LoadingProvider,
    ImagesUpload,
    AngularFireAuth,
    PhotoViewer,
    Camera,
    //calendario
    //temporizador
    Insomnia,
    NavigationBar,
    NativeAudio,
    StreamingMedia,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule  {
 
}
