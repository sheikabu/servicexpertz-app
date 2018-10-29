import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ToastController } from 'ionic-angular';

import { FirstRunPage, MainPage } from '../pages';
import { Settings, User } from '../providers';

// <ion-menu [content]="content">
//   <ion-header>
//     <ion-toolbar>
//       <ion-title>Pages</ion-title>
//     </ion-toolbar>
//   </ion-header>

//   <ion-content>
//     <ion-list>
//       <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
//         {{p.title}}
//       </button>
//     </ion-list>
//   </ion-content>

// </ion-menu>


@Component({
  templateUrl: `app.component.html`
})
export class MyApp {
  rootPage;
  // rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  // pages: any[] = [
  //   { title: 'Tutorial', component: 'TutorialPage' },
  //   { title: 'Welcome', component: 'WelcomePage' },
  //   { title: 'Tabs', component: 'TabsPage' },
  //   { title: 'Cards', component: 'CardsPage' },
  //   { title: 'Content', component: 'ContentPage' },
  //   { title: 'Login', component: 'LoginPage' },
  //   { title: 'Signup', component: 'SignupPage' },
  //   { title: 'Master Detail', component: 'ListMasterPage' },
  //   { title: 'Menu', component: 'MenuPage' },
  //   { title: 'Settings', component: 'SettingsPage' },
  //   { title: 'Search', component: 'SearchPage' }
  // ];
  pages: any[] = [
    { title: 'Categories', component: 'ListMasterPage' },
    { title: 'My Profile', component: 'ProfilePage' },
    { title: 'History', component: 'HistoryPage' },
    { title: 'Contact Us', component: 'FeedbackPage' },
    { title: 'Terms & Conditions', component: 'TermsPage' },
    { title: 'Contact', component: 'ContactPage' }
  ];
  user: any;



  constructor(
    private translate: TranslateService,
    platform: Platform, settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userSerRef: User,
    private toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    this.rootPage = MainPage;
    this.userSerRef.logger().subscribe((user) => {
      this.user = user;
      console.log('User changed', this.user);
    });

    this.userSerRef.redirector().subscribe((to) => {
      if(to && this.nav) {
        this.nav.setRoot(to);
      }
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    console.log(typeof page)
    if (typeof page === 'string') {
      if (page === 'LoginPage' || page === 'RegisterPage' || page === 'FeedbackPage' || page === 'ContactPage' ) {
        console.log(page, 'pushed');
        this.nav.push(page);
      } else {
        this.nav.setRoot(page);
      }
    } else {
      this.nav.setRoot(page.component);
    }
  }

  logOut() {
    this.userSerRef.logout();

    let toast = this.toastCtrl.create({
      message: "Logged out successfully",
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.nav.setRoot('ListMasterPage');

  }
}
