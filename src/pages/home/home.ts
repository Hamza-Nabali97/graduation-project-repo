import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
              public angularFireAuth: AngularFireAuth ) {

  }

  ionViewDidLoad() {
    this.angularFireAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toastCtrl.create({
          message: `Welcome, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toastCtrl.create({
          message: 'Unauthorized/Bad Credentials',
          duration:3000
        }).present();
        this.navCtrl.popToRoot();
      }
    })
  }
}
