import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public data:any
  public email:string
  public password:string

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public storage:Storage,public config:ConfigProvider) {
  }

  ionViewDidLoad() {
  }

  login(){
    let headers = new Headers();
    //headers.append("Content-Type","application/x-www-form-urlencoded");
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Access-Control-Allow-Origin","*");
    
    let param={email:this.email,password:this.password};
    console.log(this.email)
    console.log(this.password)
    this.http.post(this.config.SERVER_IP+"/user/login",param,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data;
        window.localStorage.setItem("token",data.token)
        this.navCtrl.push(HomePage);
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

}
