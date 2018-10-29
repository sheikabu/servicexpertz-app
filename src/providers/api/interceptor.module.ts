import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from '../user/user';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    refreshTokenInProgress: any;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(private user: User) {
    }


    getApiToken() {
        return this.user.getToken();
        // return Observable.of(this.user.getToken());
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

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

                    //Refresh

                    // if (this.refreshTokenInProgress) {
                    //     return Observable.of(null);


                    //     // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                    //     // – which means the new token is ready and we can retry the request again
                    //     // return this.refreshTokenSubject
                    //     //     .filter(result => result !== null)
                    //     //     .take(1)
                    //     //     .switchMap(() => next.handle(this.addAuthenticationToken(request)));
                    // } else {
                    //     this.refreshTokenInProgress = true;

                    //     // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                    //     this.refreshTokenSubject.next(null);
                    //     // return Observable.of(null);

                    //     return this.user.refreshAccessToken().switchMap((token) => {
                    //         // return res
                    //         this.refreshTokenInProgress = false;
                    //         this.refreshTokenSubject.next(token);
                    //         req = req.clone({
                    //             setHeaders: {
                    //                 Authorization: `Bearer ${token}`
                    //             }
                    //         });
                    //         return next.handle(req);
                    //         // return Observable.of(null);
                    //     })

                    //     // Call auth.refreshAccessToken(this is an Observable that will be returned)
                    //     // return this.auth
                    //     //     .refreshAccessToken()
                    //     //     .switchMap((token: any) => {
                    //     //         //When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    //     //         // for the next time the token needs to be refreshed
                    //     //         this.refreshTokenInProgress = false;
                    //     //         this.refreshTokenSubject.next(token);

                    //     //         return next.handle(this.addAuthenticationToken(request));
                    //     //     })
                    //     //     .catch((err: any) => {
                    //     //         this.refreshTokenInProgress = false;

                    //     //         this.auth.logout();
                    //     //         return Observable.throw(error);
                    //     //     });
                    // }

                    //Refresh


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