import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../../providers/user/user';
import { Items } from '../../providers/items/items';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

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
      if (this.logger) {

        this.theForm.patchValue({
          name: this.logger.name,
          email: this.logger.email
        });
      }
    });


  }

  initForm() {
    this.theForm = this.fb.group({
      'name': [null, [Validators.required]],
      'email': [null, [Validators.required]],
      'subject': [null, [Validators.required]],
      'comments': [null, [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }


  send() {
    if (!this.theForm.valid) {
      let toast = this.toastCtrl.create({
        message: 'Please enter all fields!',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      return false;
    }
    const payload = this.theForm.value;

    let loading = this.loadingCtrl.create({
      content: 'Sending message...'
    });
    loading.present();
    this.itemSerRef.contact(payload).subscribe((res: any) => {
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
