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
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();
    this.user.login(this.account).subscribe((resp: any) => {
      loading.dismiss();
      if (resp.code === 1001) {
        this.user._loggedIn({
          'name': 'The name',
          'email': 'theemailaddress@gmail.com'
        });
        this.user._setTokens(resp.token, resp.refresh_token);
        this.navParams.get("parentPage").refresh()
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

  // doLogin() {
  //   let toast = this.toastCtrl.create({
  //     message: "Logged in successfully",
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  //   console.log(this.navParams);
  //   this.user._loggedIn({
  //     'name': 'S Vinesh',
  //     'email': 'svinesh3691@gmail.com'
  //   });
  //   this.navParams.get("parentPage").refresh()
  //   this.navCtrl.pop();
  // }
}
