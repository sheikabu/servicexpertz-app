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

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
