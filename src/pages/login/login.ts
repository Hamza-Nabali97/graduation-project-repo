import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";
import {User} from "../../models/User";
import {AngularFireAuth} from 'angularfire2/auth';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth) {

  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  navigateToSignUpPage(){
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWithEmailAndPassword(user: User){
    try {
      const userAuthResult = await this.angularFireAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password);
      this.navCtrl.setRoot(HomePage);
    }

    catch (err) {
      console.error(err);
    }
  }

  async loginWithGoogle() {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(googleProvider);
      console.log('Successful');
      this.navCtrl.setRoot(HomePage);
    } catch (e) {
      console.error(e);
    }
  }

  async loginWithFacebook() {
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase.auth().signInWithPopup(facebookProvider);
      console.log('Successful');
      this.navCtrl.setRoot(HomePage);
    } catch (e) {
      console.error(e);
    }
  }

}
