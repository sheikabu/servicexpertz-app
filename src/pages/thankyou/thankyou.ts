import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      // this.navCtrl.remove(this.navCtrl.getPrevious().index - 1);
      const startIndex = this.navCtrl.getActive().index - 3;
      this.navCtrl.remove(startIndex, 3);
    }, 100);

  }

}
