import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';

// element
import { LoadingController } from 'ionic-angular';
import { PemakaianPage } from '../pemakaian/pemakaian';
import { BaPage } from '../ba/ba';

//import { CreateWoPage } from '../create-wo/create-wo';
import { LoginPage } from '../login/login';
import { ListWoPage } from '../list-wo/list-wo';
import { UriProvider  } from '../../providers/uri/uri';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  number_index: any;
	selectedValue: number;
	nik: any ;
  wo: any ;
  foto: any;
  versi: number;
  platform_device: any;
  path: any;
  nama_file: any;
  loop_upload: any;
  witel: any;
  pages: Array<{title: string, component: any}>;
  optionsList: Array<{ value: number, text: string, checked: boolean }> = [];
	val_in: any;
	public nol: number = 0;
  modeKeys: any[];
  working_type: any = "ASSURANCE"

  loader: any;
  data_wo: Array<{id_barang: string,stok: string,satuan: string}>;
  count_wo: any;
  uri_api_alista: any;
  uri_app_amalia: any;
  uri_api_wimata: any;

	constructor(
  private file: File,
  public platform: Platform,
  private filePath: FilePath,
  private fileChooser: FileChooser,
	public navCtrl: NavController,
	public http: Http,
  private camera: Camera,
  public events: Events,
	public loadingCtrl: LoadingController,
	public storage: Storage,
  public TransferObject: FileTransferObject,
  private transfer: FileTransfer,
  private device: Device,
  public uri: UriProvider,
	public alertCtrl: AlertController)
	{

    this.pages = [];
    this.number_index = 0;
    this.path = "-";
    this.nama_file = "-";
    this.platform_device = this.device.platform;
    console.log(this.device);
    // URI
    this.uri_api_alista = this.uri.uri_api_alista;
    this.uri_app_amalia = this.uri.uri_app_amalia;
    this.uri_api_wimata = this.uri.uri_api_wimata;

	}


  SubmitWo(){
    try {
      //for(var ini = 0; ini < this.path.length; ini++){
        this.upload(this.nama_file,this.path);
      //}
      var field_kosong = false;
      var over_stok = false;
      var length_update_material = this.modeKeys.length;

      for(var idx = 0;idx < length_update_material; idx++){
         if(this.modeKeys[idx].length < 1){
          field_kosong = true;
         }

         var stok = this.data_wo[idx].stok;
         var vol = this.modeKeys[idx]
         if(Number(vol) > Number(stok)){
          over_stok = true;
          console.log('over1',this.data_wo[idx].stok);
          console.log('over2',this.modeKeys[idx]);
         }
      }

      if(field_kosong == true){
        this.showPrompt("Field update material mandatory");
      }else{
        if(over_stok == true){
          this.showPrompt("Terdeteksi update material over stok");
        }else{
          this.loading();
          this.submitAction();
        }
      }
    }catch(err) {}
  }

  submitAction(){
  	// create header content
  	let headers = new Headers({
  		'Content-Type' : 'application/x-www-form-urlencoded'
  	});

  	// create option
  	let requestOptions = new RequestOptions({
  		headers : headers
  	});

  		var id_barang = [];
  		var stok = [];
  		var satuan = [];
  		var volume = [];
  		var wo_number = [];

  	for(var idx = 0;idx < this.data_wo.length ; idx++){
  		 id_barang[idx] 	= this.data_wo[idx].id_barang;
  		 stok[idx] 		    = this.data_wo[idx].stok;
  		 satuan[idx] 		= this.data_wo[idx].satuan;
  		 volume[idx]		= this.modeKeys[idx];
  		 wo_number  		= this.wo;
  	}

  	let wo = 'wo_number='+wo_number+'&nik='+this.nik+'&id_barang='+id_barang+'&volume='+volume+'&flag=ionic&namafile='+this.nama_file+"&versi="+this.uri.versi;
    //this.showAlertNews(wo);
  	console.log("ini_parmeter "+this.uri_api_alista+'ios/put_data_pemakaian_update_eksisting.php'+wo);

  	//execute url post
    this.http.post(this.uri_api_alista+'ios/put_data_pemakaian.php',wo,requestOptions)
    //this.http.post('http://10.40.108.153/api_test/alista/ios/put_data_pemakaian.php',wo,requestOptions)
  	//this.http.post('http://api.telkomakses.co.id/API/alista/ios/put_data_pemakaian2.php',wo,requestOptions)
  	.map(res => res.json())
  	.subscribe(data => {
  		var data_response = data.status;
  		if(data_response == true){
  			this.navCtrl.setRoot(HomePage);
  			this.showPrompt(data.message);
  		}else{
  			this.showPrompt(data.message);
  		}

  		this.loader.dismiss();
  	});
  }


  loading(){
  	this.loader = this.loadingCtrl.create({
  		content: "please Wait.."
  	})

  	// execute loading
  	this.loader.present();
  }

    showPrompt(x) {
	    let prompt = this.alertCtrl.create({
	      title: 'Response Server',
	      message: x,

	      buttons: [
	        {
	          text: 'Ok',
	          handler: data => {
	            console.log('Cancel clicked');
	          }
	        }
	      ]
	    });
	    prompt.present();
	}

      showPromptApp(x) {
      let prompt = this.alertCtrl.create({
        title: 'Warning',
        message: x,

        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      prompt.present();
  }

	setData(x){
	  this.storage.set('session',x);
	}

	setNik(x){
	  this.storage.set('nik',x);
	}

	onLoad(nik){
		this.modeKeys = [];
		console.log(this.modeKeys[0]);

		this.count_wo = 0 ;
		this.data_wo = [
	      { id_barang: '-',stok: "0",satuan: "-"}
	    ];

	     this.optionsList.push({ value: 1, text: 'option 1', checked: false });
	     this.optionsList.push({ value: 2, text: 'option 2', checked: false });

	     this.loading();

		  let headers = new Headers({
	  		'Content-Type' : 'application/x-www-form-urlencoded'
	  	});

	  	// create option
	  	let requestOptions = new RequestOptions({
	  		headers : headers
	  	});

      let wo = 'nik='+nik;
	  	//let wo = 'nik=97150427';
      console.log(wo);
	  	console.log(this.uri_api_alista+'get_data_list_material.php');
	  	//execute url post
      this.http.post(this.uri_api_alista+'get_data_list_material.php',wo,requestOptions)
	  	//this.http.post('http://api.telkomakses.co.id/API/alista/get_data_list_material.php',wo,requestOptions)
	  	.map(res => res.json())
	  	.subscribe(data => {
        console.log("masuk material")

	  		this.data_wo = data;
	  		for(var idx = 0;idx < data.length;idx++){
	  			this.modeKeys[idx] = 0;
	  		}
	  		// dismiss loading from loader
	  		this.loader.dismiss();
	  	});
	}

    checkUpdate(){
      //this.http.get('http://10.40.108.153/api_test/ios/news_amalia.php?versi='+this.versi).map(res => res.json()).subscribe(data => {
      this.http.get(this.uri_app_amalia+'news_amalia.php?versi='+this.uri.versi).map(res => res.json()).subscribe(data => {
          var versi_now = data.update[0].versi;
          var trigger = data.update[0].trigger;
          var message = data.update[0].message;

          var message_news = data.news[0].message;
          var tigger_news  = data.news[0].trigger;

          if(Number(this.versi) < Number(versi_now)){
              if(trigger == 'on'){
                this.showAlert(message);
                 console.log("versi",trigger);
              }else{
                 console.log("versi",trigger);
              }
          }else {
            if(trigger == 'on'){
            this.showAlert(message);
            }
          }

          if(tigger_news == 'on'){
               this.showAlertNews(message_news);
          }
      });
    }

    loadNameJabatan(){

      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'nik='+this.nik;
      console.log('nikName',this.nik);
      this.http.post(this.uri_api_wimata+'ws_get_data_all_or_one.php',body,options)
      .map(res =>res.json())
      .subscribe(data =>{
        console.log("dari api",data);

        this.storage.get('foto')
        .then((val) => {
          this.foto = val;
          this.no_gsm(data.no_gsm);
          this.name(data.name);
          this.events.publish('menu:tampilNama',data.name,data.nama_posisi,this.foto);
        });
      });
    }

    showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Amalia update',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

    showAlertNews(x){
      let alert = this.alertCtrl.create({
        title: 'Amalia News',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

    browse(){
      this.fileGet();
      this.path = "please wait..."
    }

    fileGet(){
      //var path;
      this.fileChooser.open()
          .then(uri => {
             this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.path = filePath;

              var nama_ori = filePath.split("/");
              var index_path  = nama_ori.length;
              if(
                nama_ori[index_path-1].indexOf(".jpg") > 0  ||
                nama_ori[index_path-1].indexOf(".jpeg") > 0 ||
                nama_ori[index_path-1].indexOf(".png") > 0 ||
                nama_ori[index_path-1].indexOf(".PNG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPEG") > 0 ||
                nama_ori[index_path-1].indexOf(".pdf") > 0 ||
                nama_ori[index_path-1].indexOf(".PDF") > 0
                ){
                this.nama_file = nama_ori[index_path-1];
                //this.path = this.path.replace('file://', '');

              }else{
                this.path = "-";
                this.nama_file = "-";

                this.showPromptApp("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
              }

              //this.showAlertNews(this.nama_file);
            })
            .catch(err => {});
          })
          .catch(e => {});
    }

    upload(nama,path){
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };

      var url = this.uri_app_amalia+"uploads.php";
      const fileTransfer: FileTransferObject = this.transfer.create();


      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {

      }, err => {});

    }


    fotoAction(i){
      this.takePicture(this.camera.PictureSourceType.CAMERA,i);
    }

    validateNoWO(val: any) {
      console.log("asto azza: "+val.value);
      console.log(this.working_type);

    }

    public takePicture(sourceType,i) {
      // Create options for the Camera Dialog
        var options = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
          // Special handling for Android library
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),i);
              });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),i);
          }
        }, (err) => {
          //this.presentToast('Error while selecting image.');
        });
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName,i) {
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.path = cordova.file.dataDirectory + newFileName;
        this.nama_file = this.nik+"_"+newFileName;
      }, error => {
        //this.presentToast('Error while storing file.');
      });
    }

    private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      return newFileName;
    }

    setWitel(x){
      this.storage.set('witel',x);
    }

    no_gsm(x){
      this.storage.set('no_gsm',x);
    }

    name(x){
      this.storage.set('name',x);
    }

  loadMenu(){
    this.pages = [
        { title: 'Update Material Alista', component: HomePage },
        { title: 'List Stok Barang', component: ListWoPage },
        { title: 'Create BA online', component: PemakaianPage },
        { title: 'List BA Online', component: BaPage },
        { title: 'Logout', component: LoginPage }
    ];
  }

 loadMenuWithWitel(){
    this.pages = [
        { title: 'Update Material Alista', component: HomePage },
        { title: 'List Stok Barang', component: ListWoPage },
        { title: 'Create BA online', component: PemakaianPage },
        { title: 'List BA Online', component: BaPage },
        { title: 'Logout', component: LoginPage }
    ];
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      this.storage.get('nik').then((val) => {
      this.setData("oke");
      this.nik = val;
      this.http.get(this.uri_api_alista+'ios/get_data_team_leader.php?nik='+this.nik)
      .map(res => res.json())
      .subscribe(data => {
        try{
          console.log("ini witel",data[0].witel);
          this.setWitel(data[0].witel);
          this.loadMenuWithWitel();
          this.events.publish('menu:tampil', this.pages);
        }catch(err){
          console.log(err);
           this.loadMenu();
          this.events.publish('menu:tampil', this.pages);
        }

      },error =>{

      });

      this.checkUpdate();
      this.loadNameJabatan();
      this.onLoad(this.nik);
    });

  })
  }

}
