import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { PairRoutePage } from './../pair-route/pair-route';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-add-guard',
  templateUrl: 'add-guard.html',
})
export class AddGuardPage {

  users:any;
  route:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewController:ViewController,
    public http:Http,public modalCtrl:ModalController) {
      
      this.users=[];
      this.route=this.navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGuardPage');
    this.getPoints()
  }

  close(){
    this.viewController.dismiss();
  }

  itemSelected(item){
    let modal = this.modalCtrl.create(PairRoutePage,{item:item,route:this.route});
    modal.present();
  }

  getPoints(){
    
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://localhost/getUsers",{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.users = data;
      },
      err=>{
        console.log("error");
      }
    );
  }

}
