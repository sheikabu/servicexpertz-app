import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from '../user/user';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(private user: User) {
    }


    getApiToken() {
        return this.user.getToken();
        // return Observable.of(this.user.getToken());
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.user.getTokenAsObservable().switchMap((token: any) => {
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            return next.handle(req).catch((err) => {
                console.log(err);
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this.user.expiredLogOut();
                    return Observable.of(null);
                } else {
                    return Observable.of(null);
                }
            });

        });

    }
};
@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
    ]
})
export class InterceptorModule { }