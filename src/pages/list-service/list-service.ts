import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ListServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-service',
  templateUrl: 'list-service.html',
})
export class ListServicePage {
  item: any;
  services: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSerRef: User, public toastCtrl: ToastController) {
    this.item = navParams.get('item');
    console.log(this.item);
    this.services = this.item.services;
    console.log(this.services);

    this.userSerRef.logger().subscribe(res => {
      this.user = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListServicePage');
  }


  bookItem(item) {
    if (this.user) {
      // this.navCtrl.push('BookServicePage', {
      //   item
      // });
      this.navCtrl.push('ItemDetailPage', {
        item
      });
    } else {

      let toast = this.toastCtrl.create({
        message: 'You must login to book a service!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push('LoginPage', {
        msg: 'You must login to book a service!',
        parentPage: this
      });
    }

  }


}
