import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Validators, FormBuilder } from '@angular/forms';
import { Items } from '../../providers/items/items';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  logger: any;
  theForm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public userSerRef: User,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public itemSerRef: Items
  ) {
    this.initForm();
    this.userSerRef.logger().subscribe((res) => {
      this.logger = res;
      console.log(this.logger);
      this.theForm.patchValue({
        email: this.logger.email
      });
    });


  }

  initForm() {
    this.theForm = this.fb.group({
      'email': [null, [Validators.required]],
      'current_password': [null, [Validators.required]],
      'new_password': [null, [Validators.required]],
      'confirm_password': [null, [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }


  changePassword() {
    if (!this.theForm.valid) {
      // alert('Please enter all fields');
      let toast = this.toastCtrl.create({
        message: 'Please enter all fields!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }

    const payload = this.theForm.value;
    if (payload.confirm_password !== payload.new_password) {
      // alert('Passwords does not match');
      let toast = this.toastCtrl.create({
        message: 'Passwords does not match!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;

    }
    delete payload.confirm_password;


    let loading = this.loadingCtrl.create({
      content: 'Changing password...'
    });
    loading.present();
    this.itemSerRef.changePassword(payload).subscribe((res: any) => {
      loading.dismiss();
      if (res && res.code === 1001) {
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.pop();
      } else {
        if (res && res.message) {
          let toast = this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }

    });
  }

}
