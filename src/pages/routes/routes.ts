import { AddPointPage } from './../add-point/add-point';
import { NewRoutePage } from './../new-route/new-route';
import { AddGuardPage } from './../add-guard/add-guard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController,
   ActionSheetController,Platform } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html',
})

export class RoutesPage {
  
  data:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,
    public toastCtrl:ToastController,public http:Http,public actionSheetCtrl:ActionSheetController,
    public platform: Platform) {
      this.data = []
      this.getDataRoutes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesPage');
  }


  getDataRoutes(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://192.168.1.4/getRoutes",{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data;
        console.log(data);
      },
      err=>{
        console.log("error");
      }
    );
  }

  openModalNew(){
    let modal = this.modalCtrl.create(NewRoutePage,{sendparameter:"test envio parametros"});
    modal.present();
    modal.onDidDismiss(data=>{
      let toast=this.toastCtrl.create({
        message:'Has creado una nueva ruta',
        duration:2500
      })
      this.getDataRoutes()
      toast.present()
      }
    )
  }



  itemSelected(item){
    let modalPoint = this.modalCtrl.create(AddPointPage,{data:item});
    let modalGuard = this.modalCtrl.create(AddGuardPage,{data:item});

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Edicoin de '+item.description,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Asociar Puntos',
          icon: !this.platform.is('ios') ? 'md-pin' : null,
          handler: () => {
            modalPoint.present()
          }
        },
        {
          text: 'Asociar Guarda',
          icon: !this.platform.is('ios') ? 'md-person-add' : null,
          handler: () => {
            modalGuard.present();
          }
        },
        {
          text: 'Editar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'md-create' : null,
          handler: () => {
            console.log('Editar clicked');
          }
        },
        
        {
          text: 'Borrar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
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
