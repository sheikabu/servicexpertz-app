import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  // _user: any;
  // _user: any;
  _localStorage: any = {
    'userDetails': null
  };
  constructor(public api: Api, public storage: Storage) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  register(accountInfo: any) {
    let seq = this.api.post('user/create', accountInfo).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._localStorage.userDetails = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    // this._localStorage.userDetails = JSON.stringify(resp);
    this.storage.set('userDetails', JSON.stringify(resp));
  }

  _setTokens(t, r) {
    this.storage.set('t', t);
    this.storage.set('r', r);
    // this._localStorage.t = t;
    // this._localStorage.r = r;
  }

  logger() {
    // return JSON.parse(this._localStorage.userDetails);
    return this.storage.get('userDetails');
  }
}
