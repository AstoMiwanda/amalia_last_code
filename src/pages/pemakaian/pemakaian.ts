import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform, ViewController } from 'ionic-angular';
import { MitraPage } from '../mitra/mitra';
import { MapPage } from '../map/map';
import * as $ from 'jquery';
import { AlertController } from 'ionic-angular';	
import { Storage } from '@ionic/storage';
import { Pemakaian3Page }from '../pemakaian3/pemakaian3';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { UriProvider  } from '../../providers/uri/uri';
import { Device } from '@ionic-native/device';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the PemakaianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian',
  templateUrl: 'pemakaian.html',
})
export class PemakaianPage {
	nama_mitra: any ;
	start_date: any ;
	
	end_date: any ;
	no_wo: any ="00";
	wo_num: any;
	crew:any;
	sto: any ;
	witel: any ;
	no_permintaan: any ;
	no_telepon: any ;	
	no_inet: any ;
	nama_pelanggan: any ;
	menu: any  = "order";
	alamat_pelanggan: any;
	rt: any;
	rw: any;
	kelurahan: any;
	kecamatan: any;

	lat_odp: any = "-";
	lng_odp: any = "-";
	lat_pel: any = "-";
	lng_pel: any = "-";

	nik_teknisi_2: any

	nik: any;
	no_kontak: any;
	no_material: any = false;

	hk: any ;
	dp: any ;
	klem_primer: any ;
	klem_sec: any  ;

	tanggal_mulai: any;
	tanggal_selesai: any;

	panjang_drop_core: any = "" ;
	drop_core: any ="";
	panjang_utp: any ="";
	panjang_pvc: any ="";
	panjang_tray_cable: any ="";
	jumlah_breket: any ="";
	jumlah_klem_ring: any ="";
	jumlah_tiang_telpn: any ="";

	panjang_drop_core_v: any = "" ;
	drop_core_v: any ="";
	panjang_utp_v: any ="";
	panjang_pvc_v: any ="";
	panjang_tray_cable_v: any ="";
	jumlah_breket_v: any ="";
	jumlah_klem_ring_v: any ="";
	jumlah_tiang_telpn_v: any ="";

	disabled: any ="nok";
	disabled_no_telfon: any ="nok";
	disabled_alamat_pelanggan: any ="nok";
	disabled_nama: any ="nok";

	view_nama_mitra: any = 1;
	perusahaan: any = "telkom akses";
	no_row: any = 0;
	no_row_dsg: any = 0;
	data_material: any;
	arr_material: any;

	meter_awal: any;
	meter_akhir: any;
	
	pages: Array<{title: string, component: any}>;
	number_index: any;
	loader: any;
	path: any;
	nama_file: any;
	platform_device: any;

	bangunan: any;
	no_kontak_2: any;
	
	uri_api_alista: any;
	uri_app_amalia: any;
	uri_api_wimata: any;
	modeKeys: any[];
	count_wo: any;
	public nol: number = 0;
	popup:any;
	data_wo: Array<{id_barang: string,stok: string,satuan: string}>;
	optionsList: Array<{ value: number, text: string, checked: boolean }> = [];
  
	
  constructor(public navCtrl: NavController,
	   public navParams: NavParams,
	   public uri: UriProvider,
	   public platform: Platform,
	   public alertCtrl: AlertController,
	   public modalCtrl: ModalController,
	   public http: Http,
	   public loadingCtrl: LoadingController,
	   private device: Device,
	   public viewCtrl: ViewController,
	   private storage: Storage
   ){
   

   	  this.storage.set('session',"oke");
   	  this.tanggal_mulai 	 = new Date().toISOString();
	  this.tanggal_selesai = new Date().toISOString();
      var date2 = new Date();
      this.start_date = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      this.end_date   = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      

    this.platform.ready().then(() => {
		this.platform.registerBackButtonAction(() => {}) 
	  	this.storage.get('nik').then((val) => {
	  	// this.nik = "16850353";
	  	 console.log("ini niknya"+this.nik);
	  	});
	  })  
  }


  @HostListener('document:ionBackButton', ['$event'])
  private async overrideHardwareBackAction($event: any) {
	  await this.profileModal.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemakaianPage');
  }

   profileModal: any;
   presentProfileModal(x) {
   		this.profileModal = this.modalCtrl.create(MitraPage, { sto:x,witel:this.witel,nik:this.nik });
   		this.profileModal.onDidDismiss(data => {
			try{
				
				if(data.jenis == 'mitra'){
					this.nama_mitra = data.data;
				}else if(data.jenis == 'witel'){
				   this.witel = data.data;
				}else if(data.jenis == "sto"){
					this.sto = data.data;
				}else if(data.jenis == "no_wo"){
				   this.no_wo = data.data.no_wo;
				   this.no_permintaan = data.data.no_wo;
				   this.no_telepon = data.data.no_telfon
				   this.no_inet = data.data.no_inet
				   this.nama_pelanggan = data.data.nama
				   this.alamat_pelanggan = data.data.alamat;
				   this.sto = data.data.sto;
				   this.wo_num = data.data.wo_num;
				   this.crew = data.data.crew;

				   if(data.data.nama != ""){
					   this.disabled_nama = "ok"
				   }

				   if((data.data.no_telfon).trim != ""){
					this.disabled_no_telfon = "ok"
				   }

				//    alert(data.data.no_telfon)

				   if(data.data.alamat != ""){
					this.disabled_alamat_pelanggan = "ok"
				   }
   
				   if(data.data.no_inet != ""){
					   this.disabled = "ok"
				   }
				   
   
				   
				   
				}

			}catch(er){}
		    
		});
		   this.profileModal.present();
		   
		   
 	}

 	changeStart(val: any){
 		console.log("start");
 		this.start_date = val.year+"-"+val.month+"-"+val.day;
		console.log("ee"+JSON.stringify(val));

 	}

 	changeEnd(val: any){
 		console.log("end");
 		this.end_date = val.year+"-"+val.month+"-"+val.day;
 		console.log(this.start_date);
 	}

 	changePerusahan(val){
 		if(val == 'mitra'){
 			this.view_nama_mitra = 2;
 		}else{
 			this.view_nama_mitra = 1;
 		}
 	}

 	actionNext(){
 		
 		var no = 1;
 		var id_barang = [];
 		var volume = [];
 		var satuan = [];
 		this.no_wo = this.no_permintaan;

 		// if(this.no_kontak == undefined){
 		// 	this.showAlert("No no kontak tidak boleh kosong");
 		// }else if(this.sto == undefined){
 		// 	this.showAlert("STO Tidak boleh kosong");
 		// }else if(this.no_permintaan == undefined){
 		// 	this.showAlert("No Permintaan Tidak boleh kosong");
 		// }else if(this.no_telepon == undefined){
 		// 	this.showAlert("No Telepon Tidak boleh kosong");
 		// }else if(this.no_inet == undefined){
 		// 	this.showAlert("No Inet Tidak boleh kosong");
 		// }else if(this.start_date == undefined){
 		// 	this.showAlert("Start Date Tidak boleh kosong");
 		// }else if(this.end_date == undefined){
 		// 	this.showAlert("End Date Tidak boleh kosong");
 		// }else if(this.nama_pelanggan == undefined){
 		// 	this.showAlert("Nama Pelanggan Tidak boleh kosong");
 		// }else if(this.alamat_pelanggan == undefined){
 		// 	this.showAlert("Nama alamat pelanggan Tidak boleh kosong");
 		// }else if(this.rt == undefined){
		// 	this.showAlert("RT Tidak boleh kosong");
		// }else if(this.rw == undefined){
		// 	this.showAlert("RW Tidak boleh kosong");
		// }else if(this.kelurahan == undefined){
		// 	this.showAlert("Kelurahan Tidak boleh kosong");
		// }else if(this.kecamatan == undefined){
		// 	this.showAlert("kecamatan Tidak boleh kosong");
		// }else if(this.dp == undefined){
		// 	this.showAlert("ODP Tidak boleh kosong");
		// }else if(this.bangunan == undefined){
		// 	this.showAlert("Info Bangunan Tidak boleh kosong");
		// }else if(this.lat_odp == undefined && this.lat_pel == undefined){
		// 	this.showAlert("Info Bangunan Tidak boleh kosong");
		// }else{
			
			var datas = {
					'jumlah_tiang_telpn':this.jumlah_tiang_telpn,
					'jumlah_klem_ring':this.jumlah_klem_ring,
					'jumlah_breket':this.jumlah_breket,
					'panjang_pvc':this.panjang_pvc,
					'panjang_utp':this.panjang_utp,
					'panjang_drop_core':this.panjang_drop_core,
					'panjang_tray_cable':this.panjang_tray_cable,
					'drop_core':this.drop_core,
					'nama_mitra':this.nama_mitra,
					'no_wo':this.no_wo,
					'no_kontak':this.no_kontak,
					'meter_awal': this.meter_awal,
					'meter_akhir': this.meter_akhir,
					'sto':this.sto,
					'wo_num':this.wo_num,
					'crew':this.crew,
					'witel':this.witel,
					'nik_teknisi_2':this.nik_teknisi_2,
					'bangunan':this.bangunan,
					'no_kontak_2':this.no_kontak_2,
					'no_material':this.no_material,
					'lat_odp':this.lat_odp,
					'lng_odp':this.lng_odp,
					'lat_pel':this.lat_pel,
					'lng_pel':this.lng_pel,
					'no_permintaan':this.no_permintaan ,
					'no_telepon':this.no_telepon ,
					'no_inet':this.no_inet ,
					'start_date':this.start_date ,
					'end_date':this.end_date ,
					'nama_pelanggan':this.nama_pelanggan ,
					'alamat_pelanggan':this.alamat_pelanggan ,
					'rt':this.rt ,
					'rw':this.rw ,
					'kelurahan':this.kelurahan ,
					'kecamatan':this.kecamatan ,
					'hk':this.hk ,
					'dp':this.dp ,
					'klem_primer':this.klem_primer ,
					'klem_sec':this.klem_sec ,
					'other': {'id_barang':id_barang,'volume':volume,'satuan':satuan} ,
				};


				this.loading()
				let headers = new Headers({
					'Content-Type' : 'application/x-www-form-urlencoded'
				});	
	  
				let requestOptions = new RequestOptions({
					headers : headers
				});
		
				var json = JSON.stringify(datas)
				let wo = 'nik='+this.nik+"&wo_number="+this.no_wo+"&versi="+this.uri.versi+"&data="+json;
				console.log(this.uri.uri_api_alista+'ios/put_data_pemakaian_halaman1.php')
				this.http.post(this.uri.uri_api_alista+'ios/put_data_pemakaian_halaman1.php',wo,requestOptions)
					.timeout(10000)
					.map(res => res.json())
					.subscribe(data => {

						if(data.status){
							this.storage.set('data',datas);
							this.navCtrl.push(Pemakaian3Page);
						}else{
							alert(data.message)
						}
						this.loader.dismiss();
					},error => {
						alert("Koneksi terputus mohon coba lagi");
						this.loader.dismiss();
					  }); 
 		// }
 	}

 	showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

	
	loading(){
	  	this.loader = this.loadingCtrl.create({
	  		content: "please Wait.."
	  	})

	  	this.loader.present();
	  }

	changeNoKontak(value){
	    this.no_kontak = value.length > 8 ? value.substring(0,8) : value;
	}

	presentOdpModal(x) {

   		this.profileModal = this.modalCtrl.create(MapPage, { data: x  });
   		this.profileModal.onDidDismiss(data => {
			 
		
				if(data.data == 'ODP'){
					this.lat_odp = data.latitude;
					this.lng_odp = data.longitude;
				}else{
					this.lat_pel = data.latitude;
					this.lng_pel = data.longitude;
				}

			
		    console.log("inii"+this.lat_odp+" "+data.data);
		     
		});
   		this.profileModal.present();
 	}

 	ionViewWillLeave() {

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

}

logRatingChange(rating){
	console.log("changed rating: ",rating);
	// do your stuff
}

}
