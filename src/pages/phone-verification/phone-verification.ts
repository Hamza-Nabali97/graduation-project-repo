import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase';
import {User} from "../../models/User";

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
  //Fetch Data Passed from Signup Page
  fullName: string = "Hamza Hejja";
  userinfo = {} as User;
  windowRef : any;
  verificationCode: string;
  recaptchVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth) {
    // this.fullName = navParams.get('firstAndLastName');
    // this.userinfo = navParams.get('userinfo');
    this.userinfo.emailAddress = "hamzahejja@hotmail.com";
    this.userinfo.password ="123456";
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
        //Register New User
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.userinfo.emailAddress, this.userinfo.password)
          .then(userRegistrationSuccess => {
            if(userRegistrationSuccess.additionalUserInfo.isNewUser === true){
              let newUser = userRegistrationSuccess.user;
              alert(JSON.stringify(newUser));
            }
          }).catch(userRegistrationError => {
            alert(JSON.stringify(userRegistrationError));
        })
        console.log(this.user);
      }).catch(incorrectVerificationCodeError => {
      alert('Incorrect Verification Code');
    })
  }

}
