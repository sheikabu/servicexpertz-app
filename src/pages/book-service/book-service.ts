import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
      alert('Please fill all fields');
      return false;
    }
    this.navCtrl.push('ThankyouPage');
    // this.itemSerRef.bookService(this.theForm.value).subscribe((res) => {
    //   console.log(res);
    // });
  }

}
