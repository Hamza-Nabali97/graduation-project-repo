import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {User, UserLogin} from "../../models/user";
import {LoginPage} from "../login/login";
import {ReportsPage} from "../reports/reports";
import {PhoneVerificationPage} from "../phone-verification/phone-verification";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../CustomValidators/password-match";
import {UserLocationPage} from "../user-location/user-location";
import {UserService} from "../../services/user.service";

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
  password: string;
  signupForm: FormGroup;
  fullNameInputHelpText: string = 'Enter Your Full Name';
  emailInputHelpText: string = 'Enter Your Email Address';
  passwordInputHelpText: string = 'Password Must be At Least 8 Characters';
  confirmPasswordInputHelpText: string = 'Re-type Your Password';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              public formBuilder: FormBuilder, public angularFireAuth: AngularFireAuth, public userService: UserService) {

    this.signupForm = this.formBuilder.group({
      fullName: ['', [
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
      confirmPassword: ['', [
        Validators.required,
        passwordMatchValidator('password')
      ]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  getEmailValidationError(): string {
    let emailValidationError: string;
    this.signupForm.controls['email'].hasError('required') ? emailValidationError = 'Email Address Required' :
      this.signupForm.controls['email'].hasError('email') ? emailValidationError = 'Please Enter a Valid Email' : emailValidationError = '';

    return emailValidationError;
  }

  getPasswordValidationError(): string {
    if (this.signupForm.controls['password'].hasError('required'))
      return 'Password Required';
    else
      return 'Your password must be at least 8 characters long';

  }

  getConfirmPasswordValidationError(): string {
    return 'your password and confirmation password do not match';
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

  async registerNewUser(user: UserLogin) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then(registerResult => {
        console.log(registerResult);
        this.navCtrl.setRoot(ReportsPage);
      }).catch(registerError => {
      console.error(registerError);
    })
  }

  getLocationFromUser() {
    this.navCtrl.push(UserLocationPage).then();
  }

  showSignupConfirmationAlert() {
    // this.userService.checkUserEmail(this.user.emailAddress);
    // console.log(this.userService.flag);
    // console.log(this.userService.checkUserEmail(this.user.emailAddress));
    // if (true) {
    //   const emailExist = this.alertCtrl.create({
    //     title: 'Signup',
    //     message: 'The email address you have entered is already registered',
    //     buttons: [
    //       {
    //         text: 'Try Again',
    //         handler: () => {
    //           this.signupForm.reset();
    //         }
    //       }
    //
    //     ]
    //   });
    //   emailExist.present().then();
    // }

    const confirmationAlert = this.alertCtrl.create({
      title: 'Signup Confirmation',
      message: 'By Signing up, You Agree to our Terms & Conditions and that Your Read Data Use Policy.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Canceled');
          }
        },
        {
          text: 'I Agree',
          handler: () => {
            this.user.image = 'https://www.w3schools.com/howto/img_avatar.png';
            this.user.anonymous = false;
            this.navCtrl.push(PhoneVerificationPage, {
              newuser: this.user,
              password: this.password
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
