
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };


  // Our translated text strings
  private loginErrorString: string;
  parentPage: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.parentPage = this.navParams.get("parentPage");
  }

  // Attempt to login in through our User service
  doLogin() {
    if (!this.account.email || !this.account.password) {
      let toast = this.toastCtrl.create({
        message: 'Email & password fields are required!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }

    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();
    this.user.login(this.account).subscribe((resp: any) => {
      loading.dismiss();
      if (resp.code === 1001) {
        this.user.loggedIn(resp.user_details);
        this.user.setTokens(resp.token, resp.refresh_token);
        // this.parentPage && this.parentPage.refreshFromLogin();
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


  toRegister() {
    this.navCtrl.push('RegisterPage').then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }

}
