import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";
import {NgForm} from "@angular/forms";
import {ReportsPage} from "../reports/reports";
import {Report} from "../../models/report";
import {Location} from "../../models/location";
import {User} from "../../models/user";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Geolocation } from "@ionic-native/geolocation";


@IonicPage()
@Component({
  selector: 'page-add-report',
  templateUrl: 'add-report.html',
})
export class AddReportPage implements OnInit{


  public  base64Image: string;

  myLocation: Location = new Location(0, 0);
  mylocationIsSet = false;

  constructor(
    public userService: UserService,
    public reportService: ReportService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {}


    ngOnInit(){
      this.onLocate();
    }
    uploadPhoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }


  takePhoto() {
  const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  onAddReport(form: NgForm) {

    console.log(this.myLocation.lng+" loc"+this.myLocation.lat+"  set"+this.mylocationIsSet)
    this.reportService.addReport(new Report(form.value.description, './../assets/imgs/rubbish.jpg', this.userService.getLoginUser(), new Location( this.myLocation.lat, this.myLocation.lng), 0, '12h'));
    form.reset();
    this.navCtrl.push(ReportsPage);
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
          console.log(location.coords.latitude +"  locloc"+ location.coords.longitude)
        }
      )
      .catch(
        error => {
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

