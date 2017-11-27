import { Storage } from '@ionic/storage';
import { WorkPage } from './../work/work';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Platform,ActionSheetController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-assigned',
  templateUrl: 'assigned.html',
})
export class AssignedPage {

  routes:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewController:ViewController,
    public http:Http,public modalCtrl:ModalController,public platform:Platform,
  public actionSheetCtrl:ActionSheetController,public storage:Storage) {
    this.routes=[];
    

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignedPage');
    this.getRoute()
  }
  close(){
    this.viewController.dismiss();
  }

  getRoute(){

    

    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://192.168.1.4/getRoutesUser",{headers: headers})
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

  itemSelected(item){
    
    let modalWork = this.modalCtrl.create(WorkPage,{data:item});

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Recorrido '+item.description,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Iniciar',
          icon: !this.platform.is('ios') ? 'md-pin' : null,
          handler: () => {
            modalWork.present()
          }
        },       
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
