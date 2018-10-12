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
import {RegisterPage} from "../pages/register/register";
import {ReportPage} from "../pages/report/report";
import {ReportsPage} from "../pages/reports/reports";
import {SettingsPage} from "../pages/settings/settings";
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {firebaseConfig} from './credentials';
import {AgmCoreModule} from "@agm/core";
import {ReportService} from "../services/report.service";
import {UserService} from "../services/user.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Geolocation} from "@ionic-native/geolocation";
import {OptionsPage} from "../pages/options/options";

@NgModule({
  declarations: [
    MyApp,
    AddReportPage,
    ContactUsPage,
    InboxPage,
    LoginPage,
    MyReportsPage,
    OnMyRoutePage,
    RegisterPage,
    ReportPage,
    ReportsPage,
    SettingsPage,
    OptionsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHzZHoT7JnZJrJ7iUY2XDaZBYrDrEWXnY'
    })
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
    RegisterPage,
    ReportPage,
    ReportsPage,
    SettingsPage,
    OptionsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    ReportService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReportService,
    Camera,
    Geolocation
  ]
})
export class AppModule {
}
