import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  baseUrl: string;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public api: Api

  ) {
    this.item = navParams.get('item');
    console.log(this.item)
    this.baseUrl = this.api.domain;

  }

  bookNow() {
    this.navCtrl.push('BookServicePage', {
      item: this.item
    });
  }

}
