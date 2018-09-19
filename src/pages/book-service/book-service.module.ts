import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookServicePage } from './book-service';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    BookServicePage,
  ],
  imports: [
    IonicPageModule.forChild(BookServicePage),
    SelectSearchableModule,
    IonicSelectableModule
  ],
  
})
export class BookServicePageModule {}
