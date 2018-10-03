import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public angularFireAuth: AngularFireAuth) {

  }

  ionViewDidLoad(){
    let toastNotification = this.toastCtrl.create();
    toastNotification.setDuration(3000);
    this.angularFireAuth.authState.subscribe(data => {
      if(data) {
        if (data.isAnonymous == true) {
          toastNotification.setMessage('Logged In Anonymously');
        } else {
          if (data.uid && data.email) {
            let userEmail = data.email
            toastNotification.setMessage(`Welcome, ${userEmail}`);
          }
        }
      }
      else {
        toastNotification.setMessage('Unauthorized/Unregistered Account');
      }
      toastNotification.present();
    });
  }

}
