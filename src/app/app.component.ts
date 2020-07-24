import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { FotoPage } from '../pages/foto/foto';
import { LoginPage } from '../pages/login/login';
//import { ChoserPage } from '../pages/choser/choser';
import { ListWoPage } from '../pages/list-wo/list-wo';
import { MapPage } from '../pages/map/map';
//import { CreateWoPage } from '../pages/create-wo/create-wo';
import { PemakaianPage } from '../pages/pemakaian/pemakaian';
import { Pemakaian2Page } from '../pages/pemakaian2/pemakaian2';
import { Pemakaian4Page } from '../pages/pemakaian4/pemakaian4';
import { Pemakaian3Page } from '../pages/pemakaian3/pemakaian3';
import { ResumePage } from '../pages/resume/resume';
import { CreateSuratTugasPage } from '../pages/create-surat-tugas/create-surat-tugas';

//import { MapPage } from '../pages/map/map';
//import { MitraPage } from '../pages/mitra/mitra';
//import { SignaturePage } from '../pages/signature/signature';
import { BaPage } from '../pages/ba/ba';
import { MaterialPage } from '../pages/material/material';

@Component({
  templateUrl: 'app.html'
}) 
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  nama: any;
  jabatan: any; 
  foto: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
   public statusBar: StatusBar,
   public splashScreen: SplashScreen,public storage: Storage,public events: Events) {
    this.initializeApp();

      this.events.subscribe('menu:tampilNama', (nama,jabatan,foto) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.nama    = nama;
        this.jabatan = jabatan; 
        this.foto    = foto; 
        
        if(this.foto == null){
            this.foto = "";
        }
        
      });

      this.events.subscribe('menu:tampil', (menu) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.pages = menu;
      });

    // used for an example of ngFor and navigation
    
    storage.get('session').then((val) => {
        if(val == 'oke' || true) {
            this.pages = [
              { title: 'Update Material Alista', component: HomePage },
              { title: 'List Stok Barang', component: ListWoPage },
              { title: 'Create BA Digital', component: PemakaianPage },
              { title: 'Update Foto', component: FotoPage },
              { title: 'List BA Digital', component: BaPage },
              { title: 'Create Surat Tugas', component: CreateSuratTugasPage },
              { title: 'Logout', component: LoginPage },
            ];
              console.log('tampil', val);
              //this.rootPage = FotoPage;
              // this.rootPage = FotoPage;
              this.rootPage = PemakaianPage;
          }
          // else {
          //     console.log('login', val);
          //     //this.rootPage = FotoPage;
          //      this.rootPage = LoginPage;
          //     //this.rootPage = ResumePage;
          // }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
