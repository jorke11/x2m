import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRoutePage } from './new-route';

@NgModule({
  declarations: [
    NewRoutePage,
  ],
  imports: [
    IonicPageModule.forChild(NewRoutePage),
  ],
})
export class NewRoutePageModule {}
