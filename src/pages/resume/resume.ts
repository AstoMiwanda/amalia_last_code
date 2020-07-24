import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController ,LoadingController ,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage' 
import { SignaturePage } from '../signature/signature'
import { Http,Headers,RequestOptions } from '@angular/http';
import { UriProvider } from "../../providers/uri/uri";
import { PemakaianPage } from "../pemakaian/pemakaian";

/**
 * Generated class for the ResumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  sum_pelanggan: any=1;
  nik: any;
  loader_gif: any = 'off';
  signatureImage1 : any;
  loader: any;
  signatureImage2: any;
  sum_mitra: any=1;
  nama_signature: any = "";
  nama: any;
  no_telp: any;
  alamat: any;
  type_layanan: any;
  hasil_test_layanan: any;
  test_voice: any;
  test_internet: any = "-";
  test_use_tv:any = "-";
  tanggal_ttd: any;
  tempat_ttd: any;
  star: any = 0;
  foto: any = "https://apps.telkomakses.co.id//wimata//photo//crop_95130650.jpg"
  nama_teknisi: any //= "Azar Dwi angga P."


  data: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public modalController: ModalController,
     public uri: UriProvider,
     public storage: Storage,
     public http: Http
     ){

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();

      this.tanggal_ttd = day+"-"+month+"-"+year;

       this.storage.get('data').then((val)=>{
         this.nama = val.nama_pelanggan
         this.no_telp = val.no_telepon
         this.alamat = val.alamat_pelanggan
       })

       this.storage.get('data2').then((val)=>{
         
        if(val.psb != undefined && val.psb > 0){
          if(val.psb == "4"){
            this.type_layanan = "1P [Voice Only]"
          }else if(val.psb == "5"){
            this.type_layanan = "1P [Internet Only]"
          }else if(val.psb == "6"){
            this.type_layanan = "2P [Internet + Voice]"
          }else if(val.psb == "7"){
            this.type_layanan = "2P [Internet + UseeTv]"
          }else{
            this.type_layanan = "3P"
          }

        }else if(val.migrasi != undefined  && val.migrasi > 0){
          if(val.migrasi == "1"){
            this.type_layanan = "Infrastruktur"
          }else if(val.migrasi == "11"){
            this.type_layanan = "Infrastruktur 1P-1P [Voice ]"
          
          }else if(val.migrasi == "13"){
            this.type_layanan = "Layanan 1P-2P [Voice + Internet]"
          
          }else if(val.migrasi == "15"){
            this.type_layanan = "Infrastruktur 2P-2P [Voice + Internet]"
          
          }else if(val.migrasi == "8"){
            this.type_layanan = "Infrastruktur 2P-3P"
          
          }else if(val.migrasi == "6"){
            this.type_layanan = "Infrastruktur 1P-3P"
          
          }else if(val.migrasi == "12"){
            this.type_layanan = "Infrastruktur 1P-1P [Internet]"
          
          }else if(val.migrasi == "14"){
            this.type_layanan = "Infrastruktur 1P - 2P [Internet + UseeTv]"
          
          }else if(val.migrasi == "16"){
            this.type_layanan = "Infrastruktur 2P - 2P [Internet + UseeTv]"
          
          }else if(val.migrasi == "9"){
            this.type_layanan = "Infrastruktur 3P - 3P"
          }else if(val.migrasi == "20"){
            this.type_layanan = "Layanan 1P-2P [Internet + Voice]"
          }else if(val.migrasi == "21"){
            this.type_layanan = "Layanan 1P-2P [Internet + UseeTv]"
          }else if(val.migrasi == "3"){
            this.type_layanan = "Layanan 2P-3P "
          }else if(val.migrasi == "2"){
            this.type_layanan = "Layanan 1P-3P "
          }
        }else if(val.tambahan != undefined && val.tambahan > 0){
          if(val.tambahan == "1"){
            this.type_layanan = "Change STB"
          }else if(val.tambahan == "2"){
            this.type_layanan = "STB Tambahan"
          }else if(val.tambahan == "3"){
            this.type_layanan = "PLC"
          
          }else if(val.tambahan == "4"){
            this.type_layanan = "Wifi Extender"
          }
        }

      })
      // this.nama_signature = year+""+month+""+day+""+hours+""+minutes+"";

      this.storage.get('nik').then(val =>{
        this.nama_signature = year+""+month+""+day+""+hours+""+minutes+""+val;
        this.nik = val
        // this.nik = "16850353"
        this.loadNameJabatan()
      })

      this.storage.get('data4').then((val)=>{
        //alert(val.test_internet)
        if(val.test_voice != undefined){
          this.test_voice = val.test_voice
        }

        if(val.test_internet != undefined){
          this.test_internet = val.test_internet
        }

        if(val.test_use_tv != undefined){
          this.test_use_tv = val.test_use_tv
        }

        console.log('con4', val);
      })

      this.storage.get('data').then((val) => {
        this.data = val;
      });

      this.storage.get('data2').then((val) => {
        this.data2 = val;
      });

      this.storage.get('data3').then((val) => {
        console.log('con', val);
        this.data3 = val;
      });

      this.storage.get('data4').then((val) => {
        this.data4 = val;
        console.log(val)
      });

      this.storage.get('data5').then((val) => {
        console.log('con', val);
        this.data5 = val;
      });

      this.storage.get('data6').then((val) => {
        console.log('con', val);
        this.data6 = val;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }
  
  actionBack(){
		this.navCtrl.pop();
	}

  openSignatureModel1(){
    let modal1 = this.modalController.create(SignaturePage);
    //  this.sum_pelanggan++;
     modal1.onDidDismiss(data => {
       console.log(data);
       this.loading();
      this.signatureImage1 = data.signatureImage;
      console.log(data.signatureImage);
      this.sendPostRequest(this.signatureImage1,this.nama_signature+"_1_"+this.sum_pelanggan+".png");
    });
   modal1.present();
}

openSignatureModel2(){
   let modal2 = this.modalController.create(SignaturePage);
  //  this.sum_mitra++;
   modal2.onDidDismiss(data =>{
        this.loading();
       this.signatureImage2 = data.signatureImage;
       this.sendPostRequest(this.signatureImage2,this.nama_signature+"_2_"+this.sum_mitra+".png");
    });
   modal2.present();
}

loading(){
  this.loader = this.loadingCtrl.create({
    content: "please Wait.."
  })
  // execute loading 
  this.loader.present();
}

sendPostRequest(data,nama){
  var link = 'https://amalia.telkomakses.co.id/upload_base64.php';
  var myData = JSON.stringify({data: data,nama: nama});
  
  console.log(myData);
  this.http.post(link, myData)
  .subscribe(data => {
   this.loader.dismiss();
  }, error => {
   alert("Koneksi terputus mohon coba lagi");
   this.loader.dismiss();
  console.log("Oooops!");
  });
}

actionPut(){
  if(this.tempat_ttd == undefined){
    alert('Tempat tanda tangan tidak boleh kosong')
    return true
  }
  let confirm = this.alertCtrl.create({
    title: 'Sertakan email pelanggan ',
    inputs: [
      {
        name: 'email',
        placeholder: 'masukan email pelanggan (Wajib)'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
        }
      },
      {
        text: 'OK',
        handler: (data) => {
        //confirm.dismiss();
        this.loading();

          var js = JSON.stringify(this.data);
          var js2 = JSON.stringify(this.data2);
          var js3 = JSON.stringify(this.data3);
          var js4 = JSON.stringify(this.data4);
          var js5 = JSON.stringify(this.data5);
          var js6 = JSON.stringify(this.data6);
          
          var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2_testing.php?halaman1="+js+"&halaman2="+
          js2+"&halaman3="+js3
          +"&halaman4="+js4
          +"&halaman5="+js5
          +"&halaman6="+js6
          +"&email="+data.email
          +"&rating="+this.star
          +"&ttd1="+this.nama_signature+"_1_"+this.sum_pelanggan+".png"
          +"&ttd2="+this.nama_signature+"_2_"+this.sum_mitra+".png"
          +"&tempat_ttd="+this.tempat_ttd
          +"&nik="+this.nik
          +"&versi="+this.uri.versi; 
          console.log(ini)
          this.http.get(ini)
            .map(res => res.json())
            .subscribe(data => {
              this.loader.dismiss();
              if(data.status == "ok"){
                  this.showAlert(data.message);
                  this.navCtrl.setRoot(PemakaianPage);
              }else{
                this.showAlert(data.message);
              }
            },error =>{
                console.log('error put '+error);
            });
        }
      }
    ]
  });
confirm.present();
}

showAlert(x){
  let alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: x,
    buttons: ['OK']
  });
  alert.present();
}

logRatingChange(rating){
  console.log("changed rating: ",rating);
  this.star = rating;
  // do your stuff
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
  console.log('url',this.uri.uri_api_wimata+'ws_get_data_all_or_one.php');
  this.http.post(this.uri.uri_api_wimata+'ws_get_data_all_or_one.php',body,options)
  .map(res =>res.json())
  .subscribe(data =>{
    console.log("dari api",data);
    this.nama_teknisi = data.name
    this.foto = data.foto
   
  });
}


  

}
