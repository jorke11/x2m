import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-pair-route',
  templateUrl: 'pair-route.html',
})
export class PairRoutePage {

  item:any
  route:any
  form:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    public http:Http,public config:ConfigProvider) {
    this.item=this.navParams.get("item")
    this.route=this.navParams.get("route")
    this.form={}
    this.form.user_id= this.item.id
  }

  close(){
    this.viewCtrl.dismiss();
  }

  associate(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.form.route_id=this.route.id
    this.http.post(this.config.SERVER_IP+"/pairRoute",this.form,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log(data)
       
      },
      err=>{
        if(err.error='Unauthenticated.'){
          console.log("redireccion");
        }else{
          console.log(err);
        }
        
      }
    );

    console.log(this.form)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PairRoutePage');
  }


}

