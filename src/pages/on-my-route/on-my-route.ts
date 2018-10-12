import {Component} from '@angular/core';
import {IonicPage, LoadingController, ToastController} from 'ionic-angular';
import {Location} from "../../models/location";
import {Geolocation} from '@ionic-native/geolocation';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core'

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


  waypoints: object = [
    {
      location: {lat: 31.90537214457491, lng: 35.19275284326636},
      stopover: true,
    },
    {
      location: {lat: 31.90675938835044, lng: 35.189086933782164},
      stopover: true,
    },
    {
      location: {lat: 31.90335907697418, lng: 35.18656923353228},
      stopover: true,
    },
    {
      location: {lat: 31.89704387897999, lng: 35.18742754025334},
      stopover: true,
    }
  ];

  points: Location[] = [new Location(31.90537214457491, 35.19275284326636),
    new Location(31.90675938835044, 35.189086933782164),
    new Location(31.90335907697418, 35.18656923353228),
    new Location(31.89704387897999, 35.18742754025334)];

  origin: any
  dest: any

  constructor(private mapsAPILoader: MapsAPILoader, private geolocation: Geolocation, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }


  displayDirection(event: any) {


    let inputPath = event.routes[0].overview_path;

    let newPath: any[] = [];


    inputPath.forEach(point => {
      newPath.push(new google.maps.LatLng(point.lat(), point.lng()));

    });


    let line = new google.maps.Polyline({
      path: newPath
    });

    console.log(newPath);


    for (let point of this.points) {

      let myPosition = new google.maps.LatLng(point.lat, point.lng);

      if (google.maps.geometry.poly.isLocationOnEdge(myPosition, line, 10e-5)) {

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
    console.log(event.coords.lat);
    console.log(event.coords.lng);

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
