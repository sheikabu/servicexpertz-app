import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookServicePage } from './book-service';

@NgModule({
  declarations: [
    BookServicePage,
  ],
  imports: [
    IonicPageModule.forChild(BookServicePage),
  ],
})
export class BookServicePageModule {}
