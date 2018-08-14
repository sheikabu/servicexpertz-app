import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  getCategories(type) {
    return this.api.get(`category_list?type=${type}`);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
