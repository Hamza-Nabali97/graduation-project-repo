import {Component} from '@angular/core';
import {IonicPage, LoadingController, ToastController} from 'ionic-angular';
import {Location} from "../../models/location";
import {Geolocation} from '@ionic-native/geolocation';
import {} from 'googlemaps';
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";

@IonicPage()
@Component({
  selector: 'page-on-my-route',
  templateUrl: 'on-my-route.html',
})
export class OnMyRoutePage {

  myLocation: Location = new Location(31.898043, 35.204269);
  mylocationIsSet = false;
  destination: Location;
  destinationIsSet = false;
  getdirectionIsSet = false;
  origin: any;
  dest: any;
  reportsPoints: Location[] = [];
  reports: Report[];


  ionViewWillEnter() {
    this.onLocate();

    this.reportService.getReports().forEach(value => {
      this.reports.push(value.report);
    });


    for (let report of this.reports) {
      this.reportsPoints.push(new Location(report.location.lat,report.location.lng));
    }

  }

  constructor(private reportService: ReportService, private geolocation: Geolocation, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }


  displayDirection(event: any) {
    this.reportService.removeOnMyRouteReports();
    let inputPath = event.routes[0].overview_path;
    let newPath: any[] = [];

    inputPath.forEach(point => {
      newPath.push(new google.maps.LatLng(point.lat(), point.lng()));

    });


    let line = new google.maps.Polyline({
      path: newPath
    });

    console.log(newPath);

    for (var i = 0; i < (this.reportsPoints.length); i++) {

      let reportPoint = new google.maps.LatLng(this.reportsPoints[i].lat, this.reportsPoints[i].lng);
      if (google.maps.geometry.poly.isLocationOnEdge(reportPoint, line, 10e-5)) {

        console.log("in " + this.reports[i]);

        this.reportService.addOnMyRouteReport(this.reports[i]);

        const toast = this.toastCtrl.create({
          message: 'Near To Problems Check It Now !!',
          duration: 2500
        });
        toast.present();
        console.log("true");
      }
    }


  }


  onGetDirection() {
    this.getdirectionIsSet = true;
    this.origin = {lat: this.myLocation.lat, lng: this.myLocation.lng}
    this.dest = {lat: this.destination.lat, lng: this.destination.lng}
  }


  onSetMarker(event: any) {
    this.destinationIsSet = true;
    this.destination = new Location(event.coords.lat, event.coords.lng);
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


// waypoints: object = [
//   {
//     location: {lat: 31.90537214457491, lng: 35.19275284326636},
//     stopover: true,
//   },
//   {
//     location: {lat: 31.90675938835044, lng: 35.189086933782164},
//     stopover: true,
//   },
//   {
//     location: {lat: 31.90335907697418, lng: 35.18656923353228},
//     stopover: true,
//   },
//   {
//     location: {lat: 31.89704387897999, lng: 35.18742754025334},
//     stopover: true,
//   }
// ];
