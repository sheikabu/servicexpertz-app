import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  getCategories(type) {
    return this.api.get(`category_list?type=${type}`);
  }

  bookService(payload) {
    return this.api.post(`booking`, payload);
  }

  changePassword(payload) {
    return this.api.post(`user/change_password`, payload);
  }

  contact(payload) {
    return this.api.post(`contact`, payload);
  }


  feedback(payload) {
    return this.api.post(`feedback`, payload);
  }


  getSlots() {
    return this.api.get(`booking/slot_list`);
  }

  getCities() {
    return this.api.get(`booking/city_list`);
  }

  getBookings() {
    return this.api.get(`get_booking`);
  }


  add(item: Item) {
  }

  delete(item: Item) {
  }

}
