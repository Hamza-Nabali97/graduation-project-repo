import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AddReportPage} from "../pages/add-report/add-report";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {InboxPage} from "../pages/inbox/inbox";
import {LoginPage} from "../pages/login/login";
import {MyReportsPage} from "../pages/my-reports/my-reports";
import {OnMyRoutePage} from "../pages/on-my-route/on-my-route";
import {ReportPage} from "../pages/report/report";
import {ReportsPage} from "../pages/reports/reports";
import {SettingsPage} from "../pages/settings/settings";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LanguageService} from "../services/language";

import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction'   // agm-direction

import {Geolocation} from '@ionic-native/geolocation';
import {Facebook} from '@ionic-native/facebook';
import {NativeStorage} from '@ionic-native/native-storage';

import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireModule} from 'angularfire2';


const config = {
  apiKey: "AIzaSyClXaWwUKNned8zZZHHc5AL6pxT4FoC1IM",
  authDomain: "test-4d5c9.firebaseapp.com",
  databaseURL: "https://test-4d5c9.firebaseio.com",
  projectId: "test-4d5c9",
  storageBucket: "test-4d5c9.appspot.com",
  messagingSenderId: "999965153007"
};


@NgModule({
  declarations: [
    MyApp,
    AddReportPage,
    ContactUsPage,
    InboxPage,
    LoginPage,
    MyReportsPage,
    OnMyRoutePage,
    ReportPage,
    ReportsPage,
    SettingsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHzZHoT7JnZJrJ7iUY2XDaZBYrDrEWXnY',
      libraries: ['places','geometry']
    }),
    AgmDirectionModule     // agm-direction

  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddReportPage,
    ContactUsPage,
    InboxPage,
    LoginPage,
    MyReportsPage,
    OnMyRoutePage,
    ReportPage,
    ReportsPage,
    SettingsPage

  ],
  providers: [
    StatusBar,
    Geolocation,
    Facebook,
    NativeStorage,
    SplashScreen,
    AngularFireAuth,
    LanguageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
