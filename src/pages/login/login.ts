import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, Platform, ToastController} from 'ionic-angular';
import {ReportsPage} from "../reports/reports";
import {SignupPage} from "../signup/signup";
import {User, UserDoc, UserLogin} from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
import {GooglePlus} from "@ionic-native/google-plus";
import {Facebook} from "@ionic-native/facebook";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  user = {} as UserDoc;
  loginForm: FormGroup;
  emailInputHelpText: string = 'Enter Your Email Address';
  passwordInputHelpText: string = 'Enter Your Password';
  usersCollection: AngularFirestoreCollection<User>;
  users: UserDoc[] = [];


  constructor(public  platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus, public db: AngularFirestore, private userService: UserService,
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


  ngOnInit() {
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

  loginWithEmailAndPassword(user: UserLogin): void {
    const loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Logging In...'
    });

    loader.present().then(() => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password)
        .then(authenticationResult => {
          loader.dismiss();
          console.log(authenticationResult);

          this.userService.setLoginUser(user.emailAddress);

          this.navCtrl.setRoot(ReportsPage);
        }).catch(error => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "Login",
          subTitle: error,
          buttons: [
            {
              text: 'Try Again',
              role: 'cancel',
              handler: () => {
                this.loginForm.reset()
              }
            }]
        });
        alert.present();
      })
    });


  }

  loginWithGoogle(): void {
    this.googlePlus.login({
      'webClientId': '775594715599-niumrsi0kvobse5qcjbtac84j4vssplf.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'email profile'
    }).then(googleConnectSuccess => {
      // alert('Logged In');
      let credential = firebase.auth.GoogleAuthProvider.credential(googleConnectSuccess.idToken);
      this.angularFireAuth.auth.signInWithCredential(credential).then(googleLoginSuccess => {
        // alert(JSON.stringify(this.angularFireAuth.auth.currentUser));
        this.angularFireAuth.authState.subscribe(data => {
          // alert(data.email);
          // alert(data.uid);
          // alert(data.displayName);
        });

        this.navCtrl.setRoot(ReportsPage);
      }).catch(googleLoginError => {
        // alert('Login Failure/Error');
        // alert('FAILURE!');
      })
    }).catch(googleConnectFailure => {
      // alert('Google Connect Failure');
    });
  }

  loginWithFacebook(): void {
    this.facebook.logout();
    this.facebook.login(['email', 'public_profile']).then(fbAuthResponse => {
      let credential = firebase.auth.FacebookAuthProvider.credential(fbAuthResponse.authResponse.accessToken);
      this.angularFireAuth.auth.signInWithCredential(credential).then(info => {
          // alert(JSON.stringify(info));
          this.angularFireAuth.authState.subscribe(data => {
            // alert(data.email);
            // alert(data.uid);
            // alert(data.displayName);
          })
          // alert(JSON.stringify(this.angularFireAuth.auth.currentUser));
          this.navCtrl.setRoot(ReportsPage);
        }
      ).catch(authError => {
        // alert(JSON.stringify(authError));
      })
    }).catch(fbAuthNoResponse => {
      // alert(JSON.stringify(fbAuthNoResponse));
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

    const loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Logging In...'
    });
    loader.present().then(() => {

      this.angularFireAuth.auth.signInAnonymously().then(() => {
        let guestUser = {} as User;
        guestUser.emailAddress = '';
        guestUser.name = 'Guest';
        guestUser.image = 'assets/imgs/anonymous.png';
        guestUser.anonymous = true;
        guestUser.uid = this.angularFireAuth.auth.currentUser.uid;

        this.userService.setGuestUserLogin(guestUser);
        loader.dismiss();
        this.navCtrl.setRoot(ReportsPage);
      })
        .catch(error => {
          loader.dismiss();
          console.error(error);
        })
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
