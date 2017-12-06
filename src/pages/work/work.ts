import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';


declare var google:any

@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  head:any
  routes:any
  ip:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public viewController:ViewController,private barcodeScanner:BarcodeScanner,
  public geolocalization:Geolocation) {
    this.ip="http://192.168.1.6";
    this.head = this.navParams.get("data");
    this.routes=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkPage');
    this.getPoints()
  }
  close(){
    this.viewController.dismiss();
  }

  async scanQr(item){

    const results = await this.barcodeScanner.scan();
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.head.reader= results.text

    this.geolocalization.getCurrentPosition().then(response=>{
      this.head.latitude=response.coords.latitude
      this.head.longitude=response.coords.longitude
    }).catch(error=>{
        
        console.log(JSON.stringify(error));
    })
    

    console.log(JSON.stringify(this.head))
    this.http.post(this.ip+"/setReport",this.head,{headers: headers})
    
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log("ok");
        console.log(JSON.stringify(data))
        
      },
      err=>{
        console.log("error");
        console.log(JSON.stringify(err));
      }
    );

  }


  getPoints(){
    
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.ip+"/getPoints/"+this.head.route_id,{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.routes = data;
      },
      err=>{
        console.log("error");
      }
    );
  }

}
