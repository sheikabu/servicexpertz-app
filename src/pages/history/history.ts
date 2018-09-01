import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Items } from '../../providers/items/items';
import { User } from '../../providers/user/user';
import { ListMasterPage } from '../list-master/list-master';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  bookings: any = [];
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public itemSerRef: Items,
    public userSerRef: User,
  ) {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.userSerRef.logger().subscribe(res => {
      this.user = res;
      if (!this.user) {
        loading.dismiss();

        this.navCtrl.setRoot('ListMasterPage');
      } else {
        this.itemSerRef.getBookings().subscribe((res: any) => {
          loading.dismiss();
          this.bookings = res.filter(res => res.booking_id > 27);
          console.log(this.bookings);
        });
      }
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
