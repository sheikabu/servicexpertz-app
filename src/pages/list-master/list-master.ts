import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, LoadingController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/items/items';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  type: any = '1';
  cats: ArrayBuffer;
  user: any;

  constructor(
    public navCtrl: NavController,
    public itemSerRef: Items,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public userSerRef: User
  ) {
    // this.currentItems = this.items.query();
    this.getCategories();
    this.userSerRef.logger().subscribe((user) => {
      this.user = user;
    });
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
    this.itemSerRef.getCategories(this.type).subscribe((res: any) => {
      if (res.code !== 1002) {
        this.cats = res;
      }
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
    // this.navCtrl.push('ItemDetailPage', {
    //   item: item
    // });
    this.navCtrl.push('ListServicePage', {
      item
    });
  }

  toProfile() {
    if(this.user) {
      this.navCtrl.push('ProfilePage');
    } else {
      this.navCtrl.push('LoginPage');
    }
  }
}
