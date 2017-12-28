import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data:any
  email:string
  password:string

  constructor(public navCtrl: NavController,public http:Http,public config:ConfigProvider) {

  }

  login(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/x-www-form-urlencoded");


    this.http.post(this.config.SERVER_IP+"/user/login",
    {
      email:this.email,
      password:this.password,
    }
    )
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data;
        window.localStorage.setItem("token",data.token);
        console.log(data)
      },
      err=>{
        console.log("error");
      }
    );
  }

}

