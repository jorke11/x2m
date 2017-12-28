import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProductosPage } from '../pages/productos/productos';
import { ServicesPage } from '../pages/services/services';
import { RoutesPage } from '../pages/routes/routes';
import { NewRoutePage } from '../pages/new-route/new-route';
import { AddGuardPage } from '../pages/add-guard/add-guard';
import { AddPointPage } from '../pages/add-point/add-point';
import { PairRoutePage } from '../pages/pair-route/pair-route';
import { AssignedPage} from '../pages/assigned/assigned';
import { WorkPage} from '../pages/work/work';

import { Geolocation } from '@ionic-native/geolocation';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner'
import { IonicStorageModule } from '@ionic/storage';

import { ConfigProvider } from '../providers/config/config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ProductosPage,
    ServicesPage,
    RoutesPage,
    NewRoutePage,
    AddGuardPage,
    AddPointPage,
    PairRoutePage,
    AssignedPage,
    WorkPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ProductosPage,
    ServicesPage,
    RoutesPage,
    NewRoutePage,
    AddGuardPage,
    AddPointPage,
    PairRoutePage,
    AssignedPage,
    WorkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BarcodeScanner,
    NgxQRCodeModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider
  ]
})
export class AppModule {}
