import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Api } from '../../providers';
import { Items } from '../../providers/items/items';

/**
 * Generated class for the BookServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})
export class BookServicePage {

  item: any;
  theForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public itemSerRef: Items
  ) {
    this.initForm();
    this.item = navParams.get('item');
    this.setDefaults();
  }

  initForm() {
    this.theForm = this.fb.group({
      'services_id': [null, [Validators.required]],
      'selected_date': [null, [Validators.required]],
      'selected_time': ['morning', [Validators.required]],
      'comments': [''],
      'price': [''],
      'status': ['Pending', [Validators.required]],
      'read_booking': [1, [Validators.required]],
    });


  }

  setDefaults() {

    this.theForm.patchValue({
      'services_id': this.item.sid,
      'status': 'Pending',
      'price': this.item.price
    })
  }

  bookNow() {
    if (!this.theForm.valid) {
      let toast = this.toastCtrl.create({
        message: 'Please choose a date!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }


    let loading = this.loadingCtrl.create({
      content: 'Booking...'
    });
    loading.present();
    this.itemSerRef.bookService(this.theForm.value).subscribe((res: any) => {
      loading.dismiss();
      if (res && res.code === 1001) {
        this.navCtrl.push('ThankyouPage', {
          'item': this.item,
          'formdata': this.theForm.value
        });
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


  openTerms() {
    this.navCtrl.push('TermsPage', {
      'terms': this.item.terms_conditions,
    });
  }

}
