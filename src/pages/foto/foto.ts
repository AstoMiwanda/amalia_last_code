import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';
import { ResumePage } from '../resume/resume';

/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {

 img1: any = "icon_camera.png";
 img2: any = "icon_camera.png";
 img3: any = "icon_camera.png";
 img4: any = "icon_camera.png";
 img5: any = "icon_camera.png";
 img6: any = "icon_camera.png";
 img7: any = "icon_camera.png";
 img8: any = "icon_camera.png";
 img9: any = "icon_camera.png";
 img10: any = "icon_camera.png";
 img11: any = "icon_camera.png";
 img12: any = "icon_camera.png";

 nama_foo: any= "-";
 path: any;
 nik: any = "";
 deg1: any = "90deg";
 nama_file: any;
 isian: any = 'nok';
 pilihan: any;
 loader: any;

 lat_1: any;
 lat_2: any;
 lat_3: any;
 lat_4: any;
 lat_5: any;
 lat_6: any;
 lat_7: any;
 lat_8: any;
 lat_9: any;
 lat_10: any;
 lat_11: any;
 lat_12: any;

 long_1: any;
 long_2: any;
 long_3: any;
 long_4: any;
 long_5: any;
 long_6: any;
 long_7: any;
 long_8: any;
 long_9: any;
 long_10: any;
 long_11: any;
 long_12: any;

 date_1: any;
 date_2: any;
 date_3: any;
 date_4: any;
 date_5: any;
 date_6: any;
 date_7: any;
 date_8: any;
 date_9: any;
 date_10: any;
 date_11: any;
 date_12: any;

 name_1: any;
 name_2: any;
 name_3: any;
 name_4: any;
 name_5: any;
 name_6: any;
 name_7: any;
 name_8: any;
 name_9: any;
 name_10: any;
 name_11: any;
 name_12: any;

data: any;
data2: any;
data3: any;
data4: any;

psb:any;
migrasi:any;
nama_foto: any;

// nik: any;

 latitude: any;
 longitude: any;
 date_new: any;

  uri_api_alista: any;
  uploading: string;
  gagal_upload: string;
  timeout: string;

  constructor(public navCtrl: NavController,
   private fileChooser: FileChooser,
   private storage: Storage,
   public TransferObject: FileTransferObject,
   private transfer: FileTransfer,
   public platform: Platform,
   public uri: UriProvider,
   public loadingCtrl: LoadingController,
   private geolocation: Geolocation,
   public alertCtrl: AlertController,

   public navParams: NavParams,private camera: Camera
  	,private file: File,
  	public http: Http,
  	private filePath: FilePath
  	){

    this.uri_api_alista = this.uri.uri_api_alista;

    this.platform.ready().then(() => {
        this.storage.get('nik').then((val) => {
        	this.nik = val
        	this.showConfirmFoto();
          
          var date = new Date();

	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        var day = date.getDate();
	        var hours = date.getHours();
	        var minutes = date.getMinutes();
	        var seconds = date.getSeconds();
	        var millisecond = date.getMilliseconds();
          // this.nama_foto = "ini.png";
	        this.storage.get('data').then((val) => {
              this.data = val;
              this.nama_foto = val.no_permintaan+"_"+this.nik+".png";
	          });

	          this.storage.get('data2').then((val) => {
	            this.data2 = val;
	          });

	          this.storage.get('data3').then((val) => {
	            console.log('con', val);
	            this.data3 = val;
	          });

	          this.storage.get('data4').then((val) => {
	            console.log('con', val);
	            this.data4 = val;
	          });
			
	        this.koordinat();
			 
        })

        this.storage.get("data2").then((val)=>{
          this.psb = val.psb
          this.migrasi = val.migrasi
        })
    })
  }

  koordinat(){
  	 this.geolocation.getCurrentPosition().then((resp) => {
			 this.latitude = resp.coords.latitude;
			 this.longitude = resp.coords.longitude;

			}).catch((error) => {
			  console.log('Error getting location', error);
			});
  }

  getDate(){
  		var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();

        return year+"-"+month+"-"+day+" "+hours+":"+minutes
  }
   
	take(index_foto){
		let options: CameraOptions = {
		  quality: 10,
			allowEdit: true,
			saveToPhotoAlbum: true,
			correctOrientation: true,
			encodingType: this.camera.EncodingType.JPEG,
			destinationType: this.camera.DestinationType.FILE_URI
		}


		this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let nama_foto = index_foto+"_"+this.nama_foto
		 let filename = imageData.substring(imageData.lastIndexOf('/')+1);
    	 let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    	 
       this.loading()
    	 this.file.readAsDataURL(path, filename).then((res)=>{
    	 	
    	 	this.upload(nama_foto,imageData,res,index_foto)

    	 	
    	 });


		 let base64Image = 'data:image/jpeg;base64,' + imageData;
		

		}, (err) => {
		 // Handle error
		});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoPage');
  }

  foto(x){
  	this.koordinat()
  	if(this.pilihan == "1"){
  		this.take(x)
  	}else{
  		this.fileGet(x)

  	}
  }

  // sendPostRequest(data,nama){
  //    var link = 'http://amalia.telkomakses.co.id/upload_base64_2.php';
  //    var myData = JSON.stringify({data: data,nama: nama});
     
  //    console.log(myData);
  //    this.http.post(link, myData)
  //    .subscribe(data => {
  //    	alert("sending success : "+data)
  //    }, error => {
  //     alert(error);
  //     // this.loader.dismiss();
  //    console.log("Oooops!");
  //    });
  //  }

   fileGet(index_foto){
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
                 //this.nama_file = index_foto+"_"+this.nama_foto
		    	 let path =  filePath.substring(0,filePath.lastIndexOf('/')+1);
		    	 
		    	 this.file.readAsDataURL(path, this.nama_file).then((res)=>{
		    	 	this.loading()
		    	 	//this.img1 = res
		    	 	this.upload(index_foto+"_"+this.nama_foto,filePath,res,index_foto)
		    	 })
              }else{
                this.path = "-";
                this.nama_file = "-";
                //this.showPromptApp("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
              }
            })
            .catch(err => {});
          })
          .catch(e => {});
    }

    upload(nama,path,res,index_foto){

      this.uploading = "nok"
      this.timeout = "nok"
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };

      setTimeout(() => {
        
          if(this.uploading == "nok"){
            this.timeout = "ok"
            alert("upload gagal coba untuk upload ulang")
            this.loader.dismiss();
          }

      }, 20000);
     
      var url = "https://amalia.telkomakses.co.id/upload_foto.php";
      const fileTransfer: FileTransferObject = this.transfer.create();
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
        
        if(this.timeout == "nok"){
          this.uploading = "ok"
          if(index_foto == "1"){
            this.img1 = res
            this.date_1 = this.getDate()
            this.lat_1 = this.latitude
            this.long_1 = this.longitude
            this.name_1 = nama
           }else if(index_foto == "2"){
               this.img2 = res
            this.date_2 = this.getDate()
            this.lat_2 = this.latitude
            this.long_2 = this.longitude
            this.name_2 = nama
           }else if(index_foto == "3"){
               this.img3 = res
            this.date_3 = this.getDate()
            this.lat_3 = this.latitude
            this.long_3 = this.longitude
            this.name_3 = nama
           }else if(index_foto == "4"){
               this.img4 = res
            this.date_4 = this.getDate()
            this.lat_4 = this.latitude
            this.long_4 = this.longitude
            this.name_4 = nama
           }else if(index_foto == "5"){
               this.img5 = res
            this.date_5 = this.getDate()
            this.lat_5 = this.latitude
            this.long_5 = this.longitude
            this.name_5 = nama
           }else if(index_foto == "6"){
               this.img6 = res
            this.date_6 = this.getDate()
            this.lat_6 = this.latitude
            this.long_6 = this.longitude
            this.name_6 = nama
           }else if(index_foto == "7"){
               this.img7 = res
            this.date_7 = this.getDate()
            this.lat_7 = this.latitude
            this.long_7 = this.longitude
            this.name_7 = nama
           }else if(index_foto == "8"){
            this.img8 = res
         this.date_8 = this.getDate()
         this.lat_8 = this.latitude
         this.long_8 = this.longitude
         this.name_8 = nama
          }else if(index_foto == "9"){
          this.img9 = res
          this.date_9 = this.getDate()
          this.lat_9 = this.latitude
          this.long_9 = this.longitude
          this.name_9 = nama
          }else if(index_foto == "10"){
            this.img10 = res
            this.date_10 = this.getDate()
            this.lat_10 = this.latitude
            this.long_10 = this.longitude
            this.name_10 = nama
          }else if(index_foto == "11"){
            this.img11 = res
            this.date_11 = this.getDate()
            this.lat_11 = this.latitude
            this.long_11 = this.longitude
            this.name_11 = nama
          }else if(index_foto == "12"){
            this.img12 = res
            this.date_12 = this.getDate()
            this.lat_12 = this.latitude
            this.long_12 = this.longitude
            this.name_12 = nama
          }


          this.loader.dismiss(); 

        }
           
      
      }, err => {});

    }

    showConfirmFoto() {
    const confirm = this.alertCtrl.create({
      title: 'Gunaka Attach Foto?',
      message: '*bila menggunakan choose file di anjurkan menggunakan foto dari aplikasi GPS Camera',
      buttons: [
        {
          text: 'Foto Langsung',
          handler: () => {
            this.pilihan = "1";
            this.isian = 'ok';
          }
        },
        {
          text: 'Pilih Foto',
          handler: () => {
            this.pilihan = "2";
            
          }
        }
      ]
    });
    confirm.present();
  }

  loading(){
  	this.loader = this.loadingCtrl.create({
  		content: "please Wait.."
  	})
  	// execute loading 
  	this.loader.present();
  }


  showConfirm() {
    
    // if(this.psb == '3' || this.psb == '7' || this.migrasi == '8' || this.migrasi == '6' || this.migrasi == '14' || this.migrasi == '16' || this.migrasi == '9' || this.migrasi == '21' || this.migrasi == '3' || this.migrasi == '2' ){
    //   if(this.img9 == 'icon_camera.png'){
    //     alert("Foto harus lengkap")
    //     return true
    //   }
    // }

  	// if(this.img1 == 'icon_camera.png'){
  	// 	alert("Foto Depan ODP tidak boleh kosong")
  	// }else if(this.img2 == 'icon_camera.png'){
  	// 	alert("Foto Dalam ODP tidak boleh kosong")
  	// }else if(this.img3 == 'icon_camera.png'){
  	// 	alert("Foto Label DC / Precon tidak boleh kosong")
  	// }else if(this.img4 == 'icon_camera.png'){
  	// 	alert("Foto Hasil Test Redaman di ODP tidak boleh kosong")
  	// }else if(this.img5 == 'icon_camera.png'){
		// alert("Foto DC / Precon ke rumah pelanggan tidak boleh kosong")
  	// }else if(this.img6 == 'icon_camera.png'){
  	// 	alert("Foto Rumah Pelanggan tidak boleh kosong")
  	// }else if(this.img7 == 'icon_camera.png'){
		// alert("Foto jalur IKR tidak boleh kosong")
  	// }else if(this.img8 == 'icon_camera.png'){
    //   alert("Foto ONT tidak boleh kosong")
    // }else if(this.img10 == 'icon_camera.png'){
    //    alert("Foto dengan pelanggan tidak boleh kosong")
    // } else{

          var data5 = {

            name_1:this.name_1,
            name_2:this.name_2,
            name_3:this.name_3,
            name_4:this.name_4,
            name_5:this.name_5,
            name_6:this.name_6,
            name_7:this.name_7,
            name_8:this.name_8,
            name_9:this.name_9,
            name_10:this.name_10,
            name_11:this.name_11,
            name_12:this.name_12,

            lat_1:this.lat_1,
            lat_2:this.lat_2,
            lat_3:this.lat_3,
            lat_4:this.lat_4,
            lat_5:this.lat_5,
            lat_6:this.lat_6,
            lat_7:this.lat_7,
            lat_8:this.lat_8,
            lat_9:this.lat_9,
            lat_10:this.lat_10,
            lat_11:this.lat_11,
            lat_12:this.lat_12,

            long_1:this.long_1,
            long_2:this.long_2,
            long_3:this.long_3,
            long_4:this.long_4,
            long_5:this.long_5,
            long_6:this.long_6,
            long_7:this.long_7,
            long_8:this.long_8,
            long_9:this.long_9,
            long_10:this.long_10,
            long_11:this.long_11,
            long_12:this.long_12,

            date_1:this.date_1,
            date_2:this.date_2,
            date_3:this.date_3,
            date_4:this.date_4,
            date_5:this.date_5,
            date_6:this.date_6,
            date_7:this.date_7,
            date_8:this.date_8,
            date_9:this.date_9,
            date_10:this.date_10,
            date_11:this.date_11,
            date_12:this.date_12,
            pilihan:this.pilihan,

        }

        

          this.storage.set('data6',data5);
          this.loading()
          this.storage.get('data2').then(val =>{
            var parse =  JSON.stringify(val)
            var data_5 = JSON.stringify(data5);
            console.log(this.uri.uri_api_alista+"amalia_app/check_foto.php?data="+data_5+"&parse="+parse)
            this.http.get(this.uri.uri_api_alista+"amalia_app/check_foto.php?data="+data_5+"&parse="+parse)
            .timeout(10000)
            .map(res => res.json())
            .subscribe(data => {
              this.loader.dismiss();
                if(data.status == "ok"){
                  this.navCtrl.push(ResumePage);
                }else{
                  alert(data.message);
                }
            }, error => {
              alert("Koneksi terputus mohon coba lagi");
              this.loader.dismiss();
              console.log("Oooops!");
             })
          })
        }
    
            // var js = JSON.stringify(this.data);
            // var js2 = JSON.stringify(this.data2);
            // var js3 = JSON.stringify(this.data3);
            // var js4 = JSON.stringify(this.data4);
            // var js5 = JSON.stringify(data5);
            
            // var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2.php?halaman1="+js+"&halaman2="+
            // js2+"&halaman3="+js3
            // +"&halaman4="+js4
            // +"&halaman5="+js5
            // +"&versi="+
            // this.uri.versi; 
            // this.http.get(ini)
            //   .map(res => res.json())
            //   .subscribe(data => {
            //     this.loader.dismiss();
            //     if(data.status == "ok"){
            //         this.showAlert(data.message);
            //         //this.navCtrl.setRoot(PemakaianPage);
            //     }else{
            //       this.showAlert(data.message);
            //     }
            //   },error =>{
            //        console.log('error put '+error);
            //   });

            //console.log('Agree clicked');
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
  	// }


  actionBack(){
		this.navCtrl.pop();
	}

  showAlert(x){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

}
