import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import {User} from "../../models/User";

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
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public angularFireAuth: AngularFireAuth) {
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

   async registerNewUser(user: User){
    console.log(this.user);
    try {
      let result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.emailAddress, user.password);
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }

}
