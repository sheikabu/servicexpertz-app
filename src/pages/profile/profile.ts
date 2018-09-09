import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { MainPage } from '..';
import { Api } from '../../providers';


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
  profileImg = 'assets/img/queen-live.png';
  imageLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public userSerRef: User,
    public toastCtrl: ToastController,

  ) {
    this.userSerRef.logger().subscribe((res) => {
      this.logger = res;
      console.log(this.logger);
      if (!this.logger) {
        this.navCtrl.setRoot('ListMasterPage');
      } else {
        if (this.logger.user_image) {
          this.profileImg = `${this.api.domain}${this.logger.user_image}`;
        }
      }
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

  login() {
    this.navCtrl.push('LoginPage', { "parentPage": this });
  }

  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  logout() {
    this.userSerRef.logout();
    this.logger = null;
    let toast = this.toastCtrl.create({
      message: 'Logged out successfuly',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.pop();
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  ngOnChanges() {
  }


  onImageSelect(e) {
    console.log(e);
    const files = e.srcElement.files;
    this.imageLoading = true;
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = (event: any) => {
      this.profileImg = event.target.result;
    };

    this.userSerRef.uploadImage(this.logger.user_id, files.item(0)).subscribe((res: any) => {
      this.imageLoading = false;
      console.log(res);
      if (res && res.status === 'success') {
        this.imageLoading = true;
        this.profileImg = `${this.api.domain}${res.image_path}`;
        this.logger.user_image = res.image_path;
        this.userSerRef.loggedIn(this.logger);
      }
    });
  }

}
