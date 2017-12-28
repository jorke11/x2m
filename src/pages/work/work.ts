import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { ConfigProvider } from '../../providers/config/config';


declare var google:any
@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  head:any
  routes:any
  marker:any
  map:any
  latitude:any
  longitude:any

  @ViewChild("map") mapRef:ElementRef

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
  public viewController:ViewController,private barcodeScanner:BarcodeScanner,
  public geolocalization:Geolocation,public config:ConfigProvider) {
    
    this.head = this.navParams.get("data");
    
    this.routes=[];
    let elem=this;
    setInterval(function(){
      elem.reportGPS()
    }, 3000);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkPage');
    this.getPoints()
  }
  close(){
    this.viewController.dismiss();
  }

  reportGPS(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));


    this.geolocalization.getCurrentPosition().then(response=>{
      this.head.latitude=response.coords.latitude
      //this.head.latitude=-25.363882
      this.head.longitude=response.coords.longitude
      //this.head.longitude=131.044922

      this.http.post(this.config.SERVER_IP+"/setReportGPS",this.head,{headers: headers})
      
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log("ok");
          alert(JSON.stringify(data))
          
        },
        err=>{
          console.log("error");
          alert(JSON.stringify(err));
        }
      );
    }).catch(error=>{
        console.log(JSON.stringify(error));
    })
    
   
  }


  loadMap(data){

    this.latitude = parseFloat(data[0].latitude);
    this.longitude = parseFloat(data[0].longitude);
  
    let myLatLng = {lat:this.latitude,lng:this.longitude}
    this.map = new google.maps.Map(this.mapRef.nativeElement,{
        center:myLatLng,
        zoom:16
    })  

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      /*this.marker = new google.maps.Marker({
      position: myLatLng,
        map: this.map,
        title: 'AQUI ESTOY!',
      })*/
      
      let end = {lat:parseFloat(this.latitude),lng:parseFloat(this.longitude)}
      
      this.marker = new google.maps.Marker({
        position:end,
          map: this.map,
          title: 'AQUI ESTOY!',
        })

      this.mapRef.nativeElement.classList.add('show-map');

    
      
      console.log(data[data.length-1]);
      var init = new google.maps.LatLng(this.latitude, this.longitude);
      var endroute = new google.maps.LatLng(parseFloat(data[data.length-1].latitude), parseFloat(data[data.length-1].longitude));

      let waypoint=[];

      for(let i=1;i<data.length;i++){
        waypoint.push({
            location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            stopover: true
         });
      }

      
      directionsService.route({
        origin: init,
        destination: endroute,
        travelMode: 'DRIVING',
        waypoints:waypoint
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      //this.lastLatLng(this.marker,this.map);
    });

  }


  async scanQr(item){

    const results = await this.barcodeScanner.scan();
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.head.reader= results.text

    this.geolocalization.getCurrentPosition().then(response=>{
      this.head.latitude=response.coords.latitude
      this.head.longitude=response.coords.longitude
    }).catch(error=>{
        
        console.log(JSON.stringify(error));
    })
    

    this.http.post(this.config.SERVER_IP+"/setReport",this.head,{headers: headers})
    
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log("ok");
        alert(JSON.stringify(data))
        
      },
      err=>{
        console.log("error");
        alert(JSON.stringify(err));
      }
    );

  }


  getPoints(){
    
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.config.SERVER_IP+"/getPoints/"+this.head.route_id,{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.routes = data;
        this.loadMap(data)
      },
      err=>{
        console.log("error");
      }
    );
  }

}
