import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Items } from '../../providers/items/items';

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
  bookings: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public itemSerRef: Items
  ) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Loading...'
    // });
    // loading.present();
    // this.itemSerRef.getBookings().subscribe((res: any) => {
    //   this.bookings = res;
    //   console.log(this.bookings);
    // });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
