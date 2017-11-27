import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignedPage } from './assigned';

@NgModule({
  declarations: [
    AssignedPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignedPage),
  ],
})
export class AssignedPageModule {}
