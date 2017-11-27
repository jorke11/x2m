import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGuardPage } from './add-guard';

@NgModule({
  declarations: [
    AddGuardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGuardPage),
  ],
})
export class AddGuardPageModule {}
