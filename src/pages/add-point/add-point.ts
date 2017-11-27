import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';

import { Geolocation,Geoposition } from '@ionic-native/geolocation';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

declare var google:any

var address:any
var lat:any
var lng:any
/**
 * Generated class for the AddPointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-point',
  templateUrl: 'add-point.html',
})
export class AddPointPage {

  item:any
  map:any
  marker:any
  latlng:any
  geocoder:any
  infowindow:any
  pointers:any
  directionsService:any;
  directionsDisplay:any;
  start:any
  end:any
  request:any

  qrData=null
  
  @ViewChild("map") mapRef:ElementRef

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewController:ViewController,
    public geolocalization:Geolocation,public alertCtrl:AlertController,public http:Http,
    private barcodeScanner:BarcodeScanner) {
    
    this.item={};
    this.item = this.navParams.get("data");
    this.latlng={}
    address='';
    lat='';
    lng='';
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.pointers=[];
    this.request = {
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.getPoints()
  }

  ionViewDidLoad() {
    this.getPosition();
    
  }

  loadPoints(data){
        
      for(let row in data){
        this.marker = new google.maps.Marker({
          position: {lng:parseFloat(data[row].longitude),lat:parseFloat(data[row].latitude)},
            map: this.map,
            title: 'AQUI ESTOY!',
        })
      }
  
}

  getPosition(){
    this.geolocalization.getCurrentPosition().then(response=>{
      this.loadMap(response);
    }).catch(error=>{
        console.log(error);
    })
  }

  getPoints(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://localhost/getPoints/"+this.item.id,{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.pointers = data;
        this.loadPoints(data)
      },
      err=>{
        console.log("error");
      }
    );
  }

  loadMap(position: Geoposition){
    let latitud = position.coords.latitude
    let longitude = position.coords.longitude

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    
    let myLatLng = {lat:latitud,lng:longitude}

    this.map = new google.maps.Map(this.mapRef.nativeElement,{
      center:myLatLng,
      zoom:18
    })
    
    this.directionsDisplay.setMap(this.map);
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.marker = new google.maps.Marker({
        position: myLatLng,
          map: this.map,
          title: 'AQUI ESTOY!',
          draggable:true
        })

        this.mapRef.nativeElement.classList.add('show-map');
        
        this.lastLatLng(this.marker,this.map);
      });

  }

  lastLatLng(marker,map){
    
    lat = marker.position.lat();
    lng = marker.position.lng();

    this.geocodeLatLng({lat:lat,lng: lng},map);

    google.maps.event.addListener(marker, 'dragend', () =>{      
      lat = marker.position.lat();
      lng = marker.position.lng();
      let latlng={lat:lat,lng: lng}
      
      this.geocodeLatLng(latlng,map);
    });
  }

  addNamePoint(){
    let prompt = this.alertCtrl.create({
      title: 'Nombre Punto',
      message: "Descripcion del punto de referencia",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre punto'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.getPositionMarker(data.name);
          }
        }
      ]
    });
    prompt.present();
  }

  getPositionMarker(txtname){
    /*this.item.nametxtname;
    this.item.lng=lng;
    this.item.address=address;
    */
    if((this.pointers).length==0){
      this.start = address;      

    }else{
      this.end = address;
      this.plotRoute();
    }
    this.barcodeScanner.encode;
    this.pointers.push({name:txtname,longitude:lng,latitude:lat,address:address});

    this.marker = new google.maps.Marker({
      position: {lng:lng,lat:lat},
        map: this.map,
        title: 'AQUI ESTOY!',
      })
  }

  plotRoute(){
    
    for (let row in this.pointers) { 
      if (parseInt(row) == 0){
        this.request.origin = this.pointers[row].address;
      }

      /*this.request.waypoints.push({
            location: marker.getPosition(),
            stopover: true
      });*/
        
      
    }

    if((this.pointers).length > 0){
      this.request.destination=this.pointers[(this.pointers).length-1].address;
      
      /*this.directionsService.route(this.request, function(result, status) {
            console.log("result "+result)
            console.log("ok "+status + " == " + google.maps.DirectionsStatus.OK)
            if (status == google.maps.DirectionsStatus.OK) {
              this.directionsDisplay.setDirections(result)
              
            }
      });*/
    }
  }
  
  
  savePoint(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    
    this.item.pointers=this.pointers;

    this.http.post("http://localhost/newPoint",this.item,{headers:headers})
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
  }

  geocodeLatLng(latlng:any,map) {
    
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
  //          map.setZoom(11);
         // var marker = new google.maps.Marker({
           // position: latlng,
            //map: map
          //});
          //this.newLocation.lat = latlng.lat;
          address = results[1].formatted_address;
          //this.infowindow.setContent(results[1].formatted_address);
          //this.infowindow.open(this.map, marker);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
    
  }

  close(){
    this.viewController.dismiss()
  }
}
