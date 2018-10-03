import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  login = false;
  username: string = '';
  email: string = '';
  imageUrl: string = '';

  constructor(public alertCtrl: AlertController, public fire: AngularFireAuth) {
  }

  loginWithFB() {


    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(result => {
      console.log(result);
      this.login = true;
      this.username = result.user.displayName;
      this.email = result.user.email;
      this.imageUrl = result.user.photoURL;
    });

  }

  logoutFB() {
    this.fire.auth.signOut();
    this.login = false;
  }

  isLogin() {
    return this.login;
  }


}
