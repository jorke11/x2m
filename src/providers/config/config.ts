import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  SERVER_IP:any
  TEST_USERNAME:any

  constructor(public http: Http) {

     this.SERVER_IP = "http://192.168.0.19";
     
    console.log('Hello ConfigProvider Provider');
  }

}
