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
    this.userSerRef.logger().subscribe((res) => {
      this.logger = res;
      if(!this.logger) {
        this.navCtrl.setRoot('ListMasterPage');
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
    // const files = e.srcElement.files;
    // this.logoLoading = true;
    // const reader = new FileReader();
    // reader.readAsDataURL(files.item(0)); // read file as data url
    // reader.onload = (event: any) => { // called once readAsDataURL is completed
    //   this.companyLogo = event.target.result;
    // };

    // this.companySerRef.uploadLogo(files.item(0)).subscribe((res: any) => {
    //   this.logoLoading = false;
    //   if (res && res.status === 'success') {
    //     this.logoAvailable = true;

    //     this.cmnServiceRef.showToast('Logo upload successful');
    //     this.companyLogo = `${AppConstants.api_url}assets/uploads/company/logo/${res.file_name}`;
    //   } else {
    //     this.logoAvailable = false;
    //     this.companyLogo = this.defaultCompanyLogo;
    //   }
    // });
  }

}
