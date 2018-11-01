import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";
import {NgForm} from "@angular/forms";
import {ReportsPage} from "../reports/reports";
import {Report} from "../../models/report";
import {Location} from "../../models/location";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Geolocation} from '@ionic-native/geolocation';
import {} from 'googlemaps';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-add-report',
  templateUrl: 'add-report.html',
})
export class AddReportPage {

  source: string = '';
  myLocation: Location = new Location(31.898043, 35.204269);
  mylocationIsSet = false;
  isToggled: false;

  constructor(private geolocation: Geolocation,
              public userService: UserService,
              public reportService: ReportService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public camera: Camera,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private angularFire: AngularFireAuth) {
    this.source = "https://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg";

    this.isToggled= false;


  }

  ionViewWillEnter() {
    this.onLocate();
  }

  uploadPhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {

      this.source = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {

    });

  }


  takePhoto() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      this.source = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {

    });


  }


  onAddReport(form: NgForm) {
    let user = '';
    if (this.angularFire.auth.currentUser) {
      user = this.angularFire.auth.currentUser.uid;
    }
    console.log(form.value.anonymous);
    if (form.value.anonymous || this.angularFire.auth.signInAnonymously()) {
      user = 'anonymous';
    }


    const data = {
      ownerId: user,
      description: form.value.description,
      location: {Latitude: this.myLocation.lat, Longitude: this.myLocation.lng},
      image: this.source,
      createdDate: new Date(),
      status: 'submitted',
      lastUpdate: new Date(),
      whoAgree: []
    };

    this.reportService.addReport(data);
    form.reset();
    this.navCtrl.popToRoot();
  }

  /*
    onAddReport(form: NgForm) {


    const loader = this.loadingCtrl.create({
        content: 'Adding Your Report...'
      });

      loader.present();


      const data = {
        ownerId: this.angularFire.auth.currentUser.uid,
        description: form.value.description,
        location: {Latitude: this.myLocation.lat, Longitude: this.myLocation.lng},
        image: this.source,
        createdDate: new Date(),
        status: 'submitted',
        lastUpdate: new Date(),
        whoAgree: []
      };

      this.reportService.addReport(data)

        /*.then(
        location => {
          loader.dismiss();
          form.reset();
          this.navCtrl.popToRoot();
          console.log(new Date());
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


      form.reset();
      this.navCtrl.popToRoot();
    }

    */

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

