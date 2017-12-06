import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data:any
  email:string
  password:string
  ip:any

  constructor(public navCtrl: NavController,public http:Http) {
    this.ip="http://192.168.1.6";
  }

  login(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/x-www-form-urlencoded");


    this.http.post(this.ip+"/user/login",
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

