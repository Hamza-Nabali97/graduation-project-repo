import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";
import {User} from "../../models/User";
import {AngularFireAuth} from 'angularfire2/auth';
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus,
              public facebook: Facebook) {

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
    this.angularFireAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password)
      .then(authenticationResult => {
        console.log(authenticationResult);
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
      console.error(error);
    })
  }

  loginWithGoogle(): void {
    // let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    // this.angularFireAuth.auth.signInWithPopup(googleAuthProvider)
    //   .then(authenticationResult => {
    //     console.log(authenticationResult);
    //     this.navCtrl.setRoot(HomePage);
    //   }).catch(error => {
    //   console.error(error);
    // });
    this.googlePlus.login({
      'webClientId': '775594715599-niumrsi0kvobse5qcjbtac84j4vssplf.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'email profile'
    }).then(googleConnectSuccess => {
      let credential = firebase.auth.GoogleAuthProvider.credential(googleConnectSuccess.idToken);
      this.angularFireAuth.auth.signInWithCredential(credential).then(googleLoginSuccess => {
        alert(JSON.stringify(this.angularFireAuth.auth.currentUser));
        this.angularFireAuth.authState.subscribe(data => {
          alert(data.email);
          alert(data.uid);
          alert(data.displayName);
        })

        this.navCtrl.setRoot(HomePage);
      }).catch(googleLoginError => {
        alert('Login Failure/Error');
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
          this.navCtrl.setRoot(HomePage);
        }
      ).catch(authError => {
        alert(JSON.stringify(authError));
      })
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
      if(authUser){
        console.log(authUser);
        this.navCtrl.setRoot(HomePage);
      }
      else {
        console.log('Signed Out!');
      }
    });
  }




}
