
import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
// import { from } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

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

  private loggerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private redirectorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    public api: Api,
    public storage: Storage
  ) {
    this.storage.get('userDetails').then((resp) => {
      this.loggerSubject.next(JSON.parse(resp));
    })
  }

  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this.loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  fbLogin(accountInfo: any) {
    let seq = this.api.post('fb_login', accountInfo).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this.loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


  forgotPassword(email) {
    return this.api.post(`forgot_password`, { email });
  }

  get(url, params = {}) {
    return this.api.get(url, params);
  }

  register(accountInfo: any) {
    let seq = this.api.post('user/create', accountInfo).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this.loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  refreshToken() {

  }

  logout() {
    this.storage.set('userDetails', false);
    this.storage.set('t', null);
    this.storage.set('r', null);
    this.loggerSubject.next(false);
  }

  expiredLogOut() {
    this.logout();
    this.redirectorSubject.next('ListMasterPage');

    // window.location.reload();
  }

  loggedIn(resp) {
    this.storage.set('userDetails', JSON.stringify(resp));
    this.loggerSubject.next(resp);

  }

  setTokens(t, r) {
    this.storage.set('t', t);
    this.storage.set('r', r);
  }

  getToken(): Promise<any> {
    return this.storage.get('t').then(
      data => { return data },
      error => console.error(error)
    )
  }

  getRTokenAsObservable() {
    return fromPromise(this.getRToken());
  }


  getRToken(): Promise<any> {
    return this.storage.get('r').then(
      data => { return data },
      error => console.error(error)
    )
  }

  getTokenAsObservable() {
    return fromPromise(this.getToken());
  }


  getTokenwidRToken() {
    return this.api.get(`refresh`);

  }

  logger() {
    return this.loggerSubject.asObservable();
  }

  redirector() {
    return this.redirectorSubject.asObservable();
  }


  uploadImage(id, fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('user_image', fileToUpload);

    return this.api.post(`user/image_upload?id=${id}`, formData);
  }

  refreshAccessToken() {
    return this.getRTokenAsObservable().switchMap((data: any) => {
      if (data) {

        return this.api.get('refresh').subscribe((res: any) => {
          console.log(res);
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', `Bearer ${data}`);

          this.setTokens(res.token, res.refresh_token);
          return Observable.of(res.refresh_token);
        })
      }
      // return Observable.of(data);
      return data
    })
  }


}
