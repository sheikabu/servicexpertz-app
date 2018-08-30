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
  todaysDateString: any;
  slots: any[];
  slot_id: any;
  terms: any = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public itemSerRef: Items
  ) {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.initForm();
    this.item = navParams.get('item');
    this.setDefaults();
    this.todaysDateString = this.formatDate();
    this.itemSerRef.getSlots().subscribe((res: any) => {
      this.slots = res;
      this.theForm.patchValue({
        slot_id: res[0].ts_id
      });
      loading.dismiss();
    });
  }

  initForm() {
    this.theForm = this.fb.group({
      'services_id': [null, [Validators.required]],
      'selected_date': [null, [Validators.required]],
      'slot_id': ['', [Validators.required]],
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

    if (!this.terms) {
      let toast = this.toastCtrl.create({
        message: 'Please accept terms & conditions!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;

    }

    if (!this.theForm.valid) {
      let toast = this.toastCtrl.create({
        message: 'Please choose date!',
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
        let formData = this.theForm.value;
        formData.slot_obj = this.slots.find(s => s.ts_id === formData.slot_id)
        formData.slot =  formData.slot_obj.ts_name;
        formData.date = this.getDateString(formData.selected_date);
        this.navCtrl.push('ThankyouPage', {
          'item': this.item,
          'formdata': formData
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

  getDateString(date) {
    let dateSplit = date.split('-');
    return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
  }


  openTerms() {
    this.navCtrl.push('TermsPage', {
      'terms': this.item.terms_conditions,
    });
  }

  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
