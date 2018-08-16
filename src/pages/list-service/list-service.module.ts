import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListServicePage } from './list-service';

@NgModule({
  declarations: [
    ListServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ListServicePage),
  ],
})
export class ListServicePageModule {}
