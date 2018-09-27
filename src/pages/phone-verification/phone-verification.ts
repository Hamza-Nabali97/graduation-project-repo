import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase';

/**
 * Generated class for the PhoneVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phone-verification',
  templateUrl: 'phone-verification.html',
})
export class PhoneVerificationPage {
  windowRef : any;
  verificationCode: string;
  recaptchVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneVerificationPage');
    this.recaptchVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchVerifier.render().then(renderResult => {
      console.log('Successfully Rendered');
    }).catch(renderError => {
      console.error(renderError);
    })
  }

  sendSMSVerificationToPhone(){
    let appRecaptchaVerifier = this.recaptchVerifier;
    let phoneNumber = "+970569490340";
    console.log(phoneNumber);
    this.angularFireAuth.auth.signInWithPhoneNumber(phoneNumber, appRecaptchaVerifier)
      .then(phoneSigninResult => {
        this.confirmationResult = phoneSigninResult;
      }).catch(phoneSigninError => {
      console.error(phoneSigninError);
    })
  }

  verifySMSCode(){
    this.confirmationResult.confirm(this.verificationCode)
      .then(phoneVerificationResult => {
        alert('Verified');
        this.user = phoneVerificationResult.user;
        console.log(this.user);
      }).catch(incorrectVerificationCodeError => {
      alert('Incorrect Verification Code');
    })
  }

}
