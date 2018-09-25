import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from "../pages/signup/signup";

import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from "@ionic-native/facebook";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


firebase.initializeApp(FIREBASE_CONFIG)

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
