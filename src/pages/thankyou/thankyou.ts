import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListMasterPage } from '../list-master/list-master';

/**
 * Generated class for the ThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {
  item: any;
  formdata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.item = navParams.get('item');
    this.formdata = navParams.get('formdata');

    console.log(this.item);
    console.log(this.formdata);

  }


  toDashboard() {
      this.navCtrl.setRoot(ListMasterPage);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      // const startIndex = this.navCtrl.getActive().index - 3;
      // this.navCtrl.remove(startIndex, 3);
    }, 100);

  }

}
