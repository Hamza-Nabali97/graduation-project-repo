import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { User } from "../../models/user";
import { LoginPage } from "../login/login";
import { PhoneVerificationPage } from "../phone-verification/phone-verification";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {passwordMatchValidator} from "../../CustomValidators/password-match";
import {UserLocationPage} from "../user-location/user-location";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  confirmationPasswordType: string = 'password';
  confirmationPasswordIcon: string = 'eye-off';
  signupButtonDisabledFlag: boolean = true;
  fullName: string;
  user = {} as User;
  signupForm: FormGroup;
  fullNameInputHelpText: string = 'Enter Your Full Name';
  emailInputHelpText: string = 'Enter Your Email Address';
  passwordInputHelpText: string = 'Password Must be At Least 8 Characters';
  confirmPasswordInputHelpText: string = 'Re-type Your Password';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              public formBuilder: FormBuilder) {

    this.signupForm = this.formBuilder.group({
      fullName:  ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]],
      confirmPassword : ['', [
        Validators.required,
        passwordMatchValidator('password')
      ]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPasswordForConfirmPassword() {
    this.confirmationPasswordType = this.confirmationPasswordType === 'text' ? 'password' : 'text';
    this.confirmationPasswordIcon = this.confirmationPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  agreeToggleChangedState() {
    this.signupButtonDisabledFlag = !this.signupButtonDisabledFlag;
  }

  getLocationFromUser() {
    this.navCtrl.push(UserLocationPage).then();
  }

  showSignupConfirmationAlert () {
    const confirmationAlert = this.alertCtrl.create({
      title:'Signup Confirmation',
      message: 'By Signing up, You Agree to our Terms & Conditions and that Your Read Data Use Policy.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Canceled');
          }
        },
        {
          text:'I Agree',
          handler: () => {
            this.navCtrl.push(PhoneVerificationPage, {
              firstAndLastName: this.fullName,
              userinfo: this.user
            });
          }
        }
      ]
    });
    confirmationAlert.present().then();
  }

  showHelperTextForInput(inputHelpText) {
    this.showToastMessage(inputHelpText, 2000, 'top');
  }

  showToastMessage(message, duration, position) {
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    }).present().then();
  }


  navigateToLoginPage(): void {
    this.navCtrl.setRoot(LoginPage);
  }

}
