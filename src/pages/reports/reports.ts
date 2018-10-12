import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private angularFire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    let toast = this.toastCtrl.create({
      duration: 3000,
    });
    this.angularFire.authState.subscribe(loggedInUser => {
      if(loggedInUser && loggedInUser.uid){
        if(loggedInUser.isAnonymous){
          toast.setMessage('Logged ')
        }
      }
    })
  }

}
