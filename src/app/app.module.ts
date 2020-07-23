import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule  } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UriProvider } from '../providers/uri/uri';
import { GoogleMaps } from '@ionic-native/google-maps';


import { MaterialPage } from '../pages/material/material';
import { MapPage } from '../pages/map/map';
import { ResumePage } from '../pages/resume/resume';
import { HomePage } from '../pages/home/home';
import { FotoPage } from '../pages/foto/foto';
import { PemakaianPage } from '../pages/pemakaian/pemakaian';
import { Pemakaian2Page } from '../pages/pemakaian2/pemakaian2';
import { Pemakaian3Page } from '../pages/pemakaian3/pemakaian3';
import { Pemakaian4Page } from '../pages/pemakaian4/pemakaian4';
import { BaPage } from '../pages/ba/ba';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ChoserPage } from '../pages/choser/choser';
import { ListWoPage } from '../pages/list-wo/list-wo';
import { CreateWoPage } from '../pages/create-wo/create-wo';
import { ModalNikBawahanPage } from '../pages/modal-nik-bawahan/modal-nik-bawahan'; 
import { MitraPage } from '../pages/mitra/mitra';
import { SignaturePage } from '../pages/signature/signature';
import { DenahPage } from '../pages/denah/denah';
import { CreateSuratTugasPage } from '../pages/create-surat-tugas/create-surat-tugas';
import { HTTP } from '@ionic-native/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Geolocation } from '@ionic-native/geolocation';
import { StarRatingModule } from 'ionic3-star-rating';



@NgModule({
  declarations: [
    MyApp,
    MitraPage,
    SignaturePage,
    DenahPage,
    HomePage,
    MapPage,
    ResumePage,
    PemakaianPage,
    Pemakaian2Page,
    Pemakaian3Page,
    FotoPage,
    Pemakaian4Page,
    BaPage,
    MaterialPage,
    ListPage,
    LoginPage,
    ChoserPage,
    ListWoPage,
    CreateWoPage,
    ModalNikBawahanPage,
    CreateSuratTugasPage
  ],
  imports: [
    StarRatingModule,
    HttpModule,SignaturePadModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FotoPage,
    MapPage,
    ResumePage,
    MitraPage,
    SignaturePage,
    DenahPage,
    HomePage,
    PemakaianPage,
    Pemakaian2Page,
    MaterialPage,
    Pemakaian3Page,
    Pemakaian4Page,
    BaPage,
    ListPage,
    LoginPage,
    ChoserPage,
    ListWoPage,
    CreateWoPage,
    ModalNikBawahanPage,
    CreateSuratTugasPage
  ],
  providers: [
  ScreenOrientation,
  
  BarcodeScanner,
  Device,
  FilePath,
  FileOpener,
  File,
  HTTP,
  GoogleMaps,
  Camera,
  Geolocation,
  AndroidPermissions,
  FileTransferObject,
  FileTransfer,
    FileChooser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UriProvider
  ]
})
export class AppModule {}
