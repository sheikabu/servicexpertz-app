import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: any;

  constructor(
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgotPassword() {
    if (!this.email) {
      let toast = this.toastCtrl.create({
        message: 'Email is required!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }

    let loading = this.loadingCtrl.create({
      content: 'Sending email...'
    });
    loading.present();
    this.user.forgotPassword(this.email).subscribe((resp: any) => {
      loading.dismiss();
      if (resp.code === 1001) {
        this.navCtrl.pop();
      } else {
        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
