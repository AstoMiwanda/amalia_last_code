import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the CreateSuratTugasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-surat-tugas',
  templateUrl: 'create-surat-tugas.html',
})
export class CreateSuratTugasPage {

  nik: any
  inputOrder: any
  addressOrder: any
  loader: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    private storage: Storage,
    public platform: Platform,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {
    this.platform.ready().then(() => {
      this.storage.get('nik').then((val) => {
        this.nik = val;
      });
    })
    this.nik = '21190042'
    this.addressOrder = ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSuratTugasPage');
  }

  generateSuratTugas() {
    this.loading()
    var link = 'https://amalia.telkomakses.co.id/pdf/examples/amalia_create_surat_tugas.php?';
    link = link + "&nik=" + this.nik
    link = link + "&no_wo=" + this.inputOrder
    link = link + "&alamat=" + this.addressOrder

    this.http.get(link)
      .subscribe(data => {}, err => {
        var errBody = JSON.parse(<string>err._body)
        if (errBody.error == "ADDRESS_NOT_FOUND") {
          this.loader.dismiss()
          this.formAlert()

        } else if (errBody.error == "NO_WO_NOT_FOUND") {
          this.loader.dismiss()
          this.basicAlert("Tidak ditemukan", "Input order tidak ditemukan, silahkan cek kembali input order anda.")
        }
      }, () => {
        this.loader.dismiss()
        this.downloadSuratTugas()
        console.log("asto anin");
      });
  }

  downloadSuratTugas() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    var url = 'https://amalia.telkomakses.co.id/pdf/examples/amalia_create_surat_tugas.php?';
    url = url + "&nik=" + this.nik
    url = url + "&no_wo=" + this.inputOrder
    url = url + "&alamat=" + this.addressOrder

    console.log(encodeURI(url));
    fileTransfer.download(encodeURI(url), this.file.externalRootDirectory + this.inputOrder + "_" + this.nik + ".pdf").then((entry) => {
      this.fileOpener.open(this.file.externalRootDirectory + this.inputOrder + "_" + this.nik + ".pdf", 'application/pdf')
        .then(() => console.log('asto download'))
        .catch(e => this.basicAlert('Error', e));
    }, (error) => {
      this.basicAlert('Error', error);
    });
    
    this.addressOrder = ""
    this.basicAlert('Berhasil', 'File surat tugas berhasil digenerate.');
  }

  loading() {
    this.loader = this.loadingController.create({
      cssClass: 'my-custom-class',
      content: 'Please wait. . .'
    })

    this.loader.present();
  }

  formAlert() {
    const prompt = this.alertCtrl.create({
      title: 'Alamat Surat Tugas',
      subTitle: 'Informasi alamat tidak diketahui, masukan secara manual alamat surat tugas anda.',
      inputs: [
        {
          name: 'address',
          placeholder: 'Alamat'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.addressOrder = ""
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addressOrder = data.address
            this.generateSuratTugas()
            console.log('Saved clicked')
          }
        }
      ]
    });
    prompt.present();
  }

  basicAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
