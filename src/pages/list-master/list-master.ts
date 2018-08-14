import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, LoadingController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/items/items';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  type: any = '1';
  cats: ArrayBuffer;

  constructor(
    public navCtrl: NavController,
    public itemSerRef: Items,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {
    // this.currentItems = this.items.query();
    this.getCategories();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  getCategories() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.itemSerRef.getCategories(this.type).subscribe((res) => {
      this.cats = res;
      loading.dismiss();
    }, (err) => {
      console.log(err);
    })
  }

  changeCategory() {
    this.getCategories();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
