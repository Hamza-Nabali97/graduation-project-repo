import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
    SettingsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    SettingsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
