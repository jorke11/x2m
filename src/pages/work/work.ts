import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  head:any
  routes:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public viewController:ViewController,private barcodeScanner:BarcodeScanner) {
    this.head = this.navParams.get("data");
    console.log(this.head)
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
  	alert(results.text)
    //const results = await this.barcodeScanner.scan();
  	//alert(results.text)
  }

  getPoints(){
    
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://192.168.1.4/getPoints/"+this.head.route_id,{headers: headers})
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
