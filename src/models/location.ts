export class Location {
  constructor(public lat: number, public lng: number) {}

  setLocation(lat: number,lng: number){
    this.lat=lat;
    this.lng=lng;
  }
}
