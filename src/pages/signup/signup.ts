import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import {User} from "../../models/User";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {PhoneVerificationPage} from "../phone-verification/phone-verification";

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
  agreeCheckboxFlag: boolean;
  fullName: string;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth, public alertCtrl: AlertController) {
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


  agreeCheckboxChangedState(isChecked: boolean) {
    this.signupButtonDisabledFlag = (isChecked === true) ? false : true;
  }

   async registerNewUser(user: User){
    /*try {
      const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.emailAddress, user.password);
    }
    catch (e) {
      console.error(e);
    }*/
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then(registerResult => {
        console.log(registerResult);
        this.navCtrl.setRoot(HomePage);
      }).catch(registerError => {
        console.error(registerError);
    })
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
    confirmationAlert.present();
  }

  navigateToLoginPage(): void {
    this.navCtrl.setRoot(LoginPage);
  }

}
