import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase';
import {User} from "../../models/user";
import {ReportsPage} from "../reports/reports";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'page-phone-verification',
  templateUrl: 'phone-verification.html',
})
export class PhoneVerificationPage {
  //Fetch Data Passed from Signup Page
  name: string;
  emailAddress: string;
  phoneNumber: string='';
  windowRef: any;
  verificationCode: string;
  recaptchVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  user = {} as User;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth, public userService: UserService) {
    this.user = this.navParams.get('newuser');
    this.password = this.navParams.get('password');
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

  sendSMSVerificationToPhone() {
    let appRecaptchaVerifier = this.recaptchVerifier;
    this.phoneNumber = "+970" + this.phoneNumber;
    alert(this.phoneNumber);
    this.angularFireAuth.auth.signInWithPhoneNumber(this.phoneNumber, appRecaptchaVerifier)
      .then(phoneSigninResult => {
        this.confirmationResult = phoneSigninResult;
      }).catch(phoneSigninError => {
      console.error(phoneSigninError);
    })
  }

  verifySMSCode() {
    this.confirmationResult.confirm(this.verificationCode)
      .then(phoneVerificationResult => {
        //Register New User
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.user.emailAddress, this.password)
          .then(userRegistrationSuccess => {
            if (userRegistrationSuccess.additionalUserInfo.isNewUser === true) {
              let newUser = userRegistrationSuccess.user;
              alert(JSON.stringify(newUser));

              this.user.uid = userRegistrationSuccess.user.uid;
              this.userService.addUser(this.user);

              this.navCtrl.setRoot(ReportsPage);
            }
          }).catch(userRegistrationError => {
          alert(JSON.stringify(userRegistrationError));
        })
        console.log(this.user);
      }).catch(incorrectVerificationCodeError => {
      alert(JSON.stringify(incorrectVerificationCodeError));
    })
  }

}
