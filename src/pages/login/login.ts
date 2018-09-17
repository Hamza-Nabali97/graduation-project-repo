import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../models/User";
import {AngularFireAuth} from 'angularfire2/auth';
import {SignupPage} from "../signup/signup";

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

  async login(user: User){
    try {
      const userAuthResult = this.angularFireAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password);
      if(userAuthResult){
        window.alert('Authentication Succeeded');
        this.navCtrl.setRoot(HomePage);
      }
    } catch (err) {
      console.log(err);
    }
  }

}
