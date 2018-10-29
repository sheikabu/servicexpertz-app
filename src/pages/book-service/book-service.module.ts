import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookServicePage } from './book-service';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    BookServicePage,
  ],
  imports: [
    IonicPageModule.forChild(BookServicePage),
    IonicSelectableModule
  ],
  
})
export class BookServicePageModule {}
