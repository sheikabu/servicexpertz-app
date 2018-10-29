import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  account: any = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confpass: '',
    active: true
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController
  ) {
  }

  save() {



    let payload = this.account;
    if (!payload.name || !payload.email || !payload.phone || !payload.password) {
      let toast = this.toastCtrl.create({
        message: 'Please fill all the fields!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }

    if (payload.password !== payload.confpass) {
      let toast = this.toastCtrl.create({
        message: 'Passwords doesnot match!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }

    delete this.account.confpass;

    let loading = this.loadingCtrl.create({
      content: 'Registering...'
    });
    loading.present();

    this.user.register(payload).subscribe((res: any) => {
      loading.dismiss();
      if (res.code === 1002) {
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      if (res.code === 1001) {
        let toast = this.toastCtrl.create({
          message: 'Registeration successful, Please Login',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push('LoginPage').then(() => {
          this.navCtrl.remove(this.navCtrl.getPrevious().index);
        });
        // this.navCtrl.pop();
      }
    }, (err) => {

      // this.navCtrl.push(MainPage);
      loading.dismiss();

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: 'Something went wrong, Please try again!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }


  toLogin() {
    this.navCtrl.push('LoginPage').then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }
}
