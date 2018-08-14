import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { MainPage } from '..';


/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  logger: any;


  constructor(
    public navCtrl: NavController,
    public userSerRef: User,
    public toastCtrl: ToastController,

  ) {
    this.logger = this.userSerRef.logger();
    console.log(this.logger);
  }

  refresh() {
    this.logger = this.userSerRef.logger();
    console.log(this.logger);
  }

  ionViewDidLoad() {
    console.log('Loading Profile');
  }

  ionViewWillEnter() {
  }

  login() {
    this.navCtrl.push('LoginPage', { "parentPage": this });
  }


  logout() {
    this.userSerRef.logout();
    this.refresh();
    let toast = this.toastCtrl.create({
      message: 'Logged out successfuly',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.parent.select(0);

  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }


}
