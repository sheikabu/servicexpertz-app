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
  cities: any[];
  actualSlots: any;

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
    this.todaysDateString = this.formatDate();
    this.getSlots();
    this.getCities();
    this.subDateChange();
  }

  subDateChange() {
    this.theForm.get('selected_date').valueChanges.subscribe((val) => {
      console.log(val);
      const theDate = new Date(val);
      console.log(theDate);
      var d = new Date(); // for now
      if (
        theDate.getDate() === d.getDate()
        &&
        theDate.getMonth() === d.getMonth()
        &&
        theDate.getFullYear() === d.getFullYear()
      ) {
        console.log("Same Date");
        this.theForm.patchValue({
          slot_id: null
        });
        this.slots = this.actualSlots.filter((s)=>{
          return s.till_time > d.getHours() + 1
        })
      } else {
        this.slots = this.actualSlots.filter((s)=>{
          return true;
        })
      }
    })
  }

  getSlots() {
    this.itemSerRef.getSlots().subscribe((res: any) => {
      this.actualSlots = res.map((s) => {
        switch (+s.ts_id) {
          case 1:
            s.till_time = 4
            break;
          case 2:
            s.till_time = 7
            break;
          case 3:
            s.till_time = 10
            break;
          case 4:
            s.till_time = 13
            break;
          case 5:
            s.till_time = 16
            break;
          case 6:
            s.till_time = 19
            break;
          default:
            s.till_time = 0
        }
        return s;
      });

      this.slots = this.actualSlots.filter(() => {
        return true
      })

      console.log(this.slots);
      // this.theForm.patchValue({
      //   slot_id: res[0].ts_id
      // });
    });
  }


  getCities() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.itemSerRef.getCities().subscribe((res: any) => {
      this.cities = res.filter(c => c.city_state === 'Kerala');
      loading.dismiss();
    });
  }

  initForm() {
    this.theForm = this.fb.group({
      'services_id': [null, [Validators.required]],
      'selected_date': [null, [Validators.required]],
      'slot_id': ['', [Validators.required]],
      'city_id': ['', [Validators.required]],
      'pincode': [''],
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
        message: 'Please fill all fields!',
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
        formData.slot = formData.slot_obj.ts_name;
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
