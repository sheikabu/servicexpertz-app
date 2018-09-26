
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Facebook, Google, LinkedIn } from "ng2-cordova-oauth/core";

import { User } from '../../providers';
import { MainPage } from '../';
import { HttpClient } from '@angular/common/http';

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



  //Facebook
  private oauth: OauthCordova = new OauthCordova();
  private facebookProvider: Facebook = new Facebook({
    clientId: "888814501321925",
    appScope: ["email"]
  })
  successResOne: Object = {
    'access_token': 'pending'
  };

  successResTwo: Object = {
    'status': 'pending'
  };
  fbstatus: any = {'a':'starting...'};



  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private http: HttpClient
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
        setTimeout(() => {
          this.navCtrl.pop();
        }, 500);
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

  forgotPassword() {
    this.navCtrl.push('ForgotPasswordPage').then(() => {
      console.log('Forgot password')
    });
  }



  public facebook() {
    this.platform.ready().then(() => {
      console.log('logging...');
      this.fbstatus = {
        'a': 'logging'
      }
      this.oauth.logInVia(this.facebookProvider, {
        clearsessioncache: 'no',
        toolbarposition: 'top'
      }).then((success: any) => {
        this.fbstatus = {
          'a': 'via',
          'b': success
        }
        console.log("RESULT: " + JSON.stringify(success));
        this.successResOne = success;
        let loading = this.loadingCtrl.create({
          content: 'Logging In...'
        });
        loading.present();

        this.http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: success.access_token, fields: "name,gender,location,picture", format: "json" } }).subscribe((res: any) => {
          this.successResTwo = res;
          this.user.fbLogin({
            name: res.name,
            fbid: res.id,
          }).subscribe((resp: any) => {
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
          })
          console.log(res);
        }, (err) => {
          alert('Error Loggin in to Facebook');
          loading.dismiss();
        });


      }, error => {
        console.log("ERROR: ", error);
        alert(error);
        this.fbstatus = {
          'a': 'error',
          'b': error
        }
      });
    });
  }

}
