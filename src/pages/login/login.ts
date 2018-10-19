import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {ReportsPage} from "../reports/reports";
import {SignupPage} from "../signup/signup";
import {User} from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
import {GooglePlus} from "@ionic-native/google-plus";
import {Facebook} from "@ionic-native/facebook";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  user = {} as User;
  loginForm: FormGroup;
  emailInputHelpText: string = 'Enter Your Email Address';
  passwordInputHelpText: string = 'Enter Your Password';


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus,
              public facebook: Facebook, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  navigateToSignUpPage() {
    this.navCtrl.setRoot(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithEmailAndPassword(user: User): void {
    const loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Logging In...'
    });
    loader.present();
    this.angularFireAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password)
      .then(authenticationResult => {
        loader.dismiss();
        console.log(authenticationResult);
        this.navCtrl.setRoot(ReportsPage);
      }).catch(error => {
      loader.dismiss();
      console.error(error);
    })
  }

  loginWithGoogle(): void {
    this.googlePlus.login({
      'webClientId': '775594715599-niumrsi0kvobse5qcjbtac84j4vssplf.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'email profile'
    }).then(googleConnectSuccess => {
      alert('Logged In');
      let credential = firebase.auth.GoogleAuthProvider.credential(googleConnectSuccess.idToken);
      this.angularFireAuth.auth.signInWithCredential(credential).then(googleLoginSuccess => {
        alert(JSON.stringify(this.angularFireAuth.auth.currentUser));
        this.angularFireAuth.authState.subscribe(data => {
          alert(data.email);
          alert(data.uid);
          alert(data.displayName);
        });

        this.navCtrl.setRoot(ReportsPage);
      }).catch(googleLoginError => {
        alert('Login Failure/Error');
        alert('FAILURE!');
      })
    }).catch(googleConnectFailure => {
      alert('Google Connect Failure');
    });
  }

  loginWithFacebook(): void {
    this.facebook.logout();
    this.facebook.login(['email', 'public_profile']).then(fbAuthResponse => {
      let credential = firebase.auth.FacebookAuthProvider.credential(fbAuthResponse.authResponse.accessToken);
      this.angularFireAuth.auth.signInWithCredential(credential).then(info => {
          alert(JSON.stringify(info));
          this.angularFireAuth.authState.subscribe(data => {
            alert(data.email);
            alert(data.uid);
            alert(data.displayName);
          })
          alert(JSON.stringify(this.angularFireAuth.auth.currentUser));
          this.navCtrl.setRoot(ReportsPage);
        }
      ).catch(authError => {
        alert(JSON.stringify(authError));
      })
    }).catch(fbAuthNoResponse => {
      alert(JSON.stringify(fbAuthNoResponse));
    });

    // let facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    // this.angularFireAuth.auth.signInWithPopup(facebookAuthProvider)
    //   .then(authenticationResult => {
    //     console.log(authenticationResult);
    //     this.navCtrl.setRoot(HomePage);
    //   }).catch(error => {
    //   console.error(error);
    // });
  }

  loginAsGuest(): void {
    this.angularFireAuth.auth.signInAnonymously().catch(error => {
      console.error(error);
    })
    this.angularFireAuth.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        this.navCtrl.setRoot(ReportsPage).then();
      }
      else {
        console.log('Signed Out!');
      }
    });
  }

  sendResetPasswordEmail(emailAddress: any) {
    this.angularFireAuth.auth.sendPasswordResetEmail(emailAddress).then(emailSendSuccess => {
      let emailSentAlert = this.alertCtrl.create({
        title: 'Email Sent!',
        subTitle: `Please Follow Steps Sent to, ${emailAddress}` + `to Reset Your Password`,
        buttons: ['OK']
      });
      emailSentAlert.present();
    }).catch(emailSendError => {
      alert('ERROR: INVALID EMAIL ADDRESS');
    })
  }

  getEmailValidationError(): String {
    let emailValidationError: String;
    this.loginForm.controls['email'].hasError('required') ? emailValidationError = 'Email Address Required' :
      this.loginForm.controls['email'].hasError('email') ? emailValidationError = 'Please Enter a Valid Email' : emailValidationError = '';

    return emailValidationError;
  }

  getPasswordValidationError(): String {
    let passwordValidationError: String;
    this.loginForm.controls['password'].hasError('required') ? passwordValidationError = 'Password Required' : '';
    return passwordValidationError;
  }

  showHelperTextForInput(input) {
    this.showToast(input, 2000, 'top');
  }
  showToast(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present().then();
  }
}
