import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  terms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.terms = this.navParams.get('terms');
  }

  ionViewDidLoad() {
  }

}
