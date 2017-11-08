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

  constructor(public navCtrl: NavController,public http:Http) {
    
  }

  login(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/x-www-form-urlencoded");


    this.http.post("http://localhost/user/login",
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

