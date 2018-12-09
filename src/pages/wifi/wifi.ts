import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";
import {Location} from "../../models/location";
import {Geolocation} from '@ionic-native/geolocation';
import {AngularFireAuth} from "@angular/fire/auth";
import {ReportsPage} from "../reports/reports";

@IonicPage()
@Component({
  selector: 'page-wifi',
  templateUrl: 'wifi.html',
})
export class WifiPage {

  wifi_strength=0;

  source: string = '';
  myLocation: Location = new Location(31.898043, 35.204269);
  mylocationIsSet = false;


  constructor(private app: App, private geolocation: Geolocation,
              private angularFire: AngularFireAuth,
              public userService: UserService,
              public reportService: ReportService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.onLocate();
  }


  onAddReport() {
    let user = '';
    if (this.angularFire.auth.currentUser) {
      user = this.angularFire.auth.currentUser.uid;
    }

    if (this.angularFire.auth.currentUser.isAnonymous) {
      user = 'anonymous';
    }


    const data = {
      ownerId: user,
      description: "Wifi Strength = " + this.wifi_strength,
      location: {lat: this.myLocation.lat, lng: this.myLocation.lng},
      image: "assets/imgs/wifi_" + this.wifi_strength + ".png",
      createdDate: new Date(),
      status: 'submitted',
      lastUpdate: new Date(),
      whoAgree: []
    };
    console.log(data.image);
    this.reportService.addReport(data);
    this.wifi_strength = 0;
    this.app.getRootNav().setRoot(ReportsPage);
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.mylocationIsSet = true;
          this.myLocation.lat = location.coords.latitude;
          this.myLocation.lng = location.coords.longitude;
        }
      )
      .catch(
        error => {
          console.log(error);
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );
  }

}
