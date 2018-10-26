import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {LoginPage} from '../pages/login/login';
import {SignupPage} from "../pages/signup/signup";
import {PhoneVerificationPage} from "../pages/phone-verification/phone-verification";
import {AddReportPage} from "../pages/add-report/add-report";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {InboxPage} from "../pages/inbox/inbox";
import {ReportsPage} from "../pages/reports/reports";
import {OnMyRoutePage} from "../pages/on-my-route/on-my-route";
import {ReportPage} from "../pages/report/report";
import {SettingsPage} from "../pages/settings/settings";

import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction'   // agm-direction
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LanguageService} from "../services/language";

import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {GooglePlus} from '@ionic-native/google-plus';
import {Facebook} from "@ionic-native/facebook";
import {NativeStorage} from '@ionic-native/native-storage';
import {Geolocation} from '@ionic-native/geolocation';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {OptionsPage} from "../pages/options/options";
import {ReportService} from "../services/report.service";
import {UserService} from "../services/user.service";
import {LanguagePage} from "../pages/language/language";


firebase.initializeApp(FIREBASE_CONFIG)

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    PhoneVerificationPage,
    AddReportPage,
    ContactUsPage,
    InboxPage,
    OnMyRoutePage,
    ReportPage,
    SettingsPage,
    ReportsPage,
    OptionsPage,
    LanguagePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHzZHoT7JnZJrJ7iUY2XDaZBYrDrEWXnY',
      libraries: ['places', 'geometry']
    }),
    AgmDirectionModule     // agm-direction
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    PhoneVerificationPage,
    AddReportPage,
    ContactUsPage,
    InboxPage,
    OnMyRoutePage,
    ReportPage,
    SettingsPage,
    ReportsPage,
    OptionsPage,
    LanguagePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeStorage,
    GooglePlus,
    Facebook,
    LanguageService,
    ReportService,
    UserService,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
