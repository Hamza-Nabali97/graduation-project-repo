import {Injectable} from '@angular/core';
import {Report} from "../models/report";
import {User} from "../models/user";
import {Location} from "../models/location";

@Injectable()
export class ReportService {

  private report: Report[] = [
    new Report("holes in the street ", 'https://www.thehindu.com/migration_catalog/article10091418.ece/alternates/FREE_660/16tvsbg03-City-+17TVTV_ROAD.jpg.jpg',
    new User('Guest', 'test@test.com', '123', 'https://pbs.twimg.com/media/DQXQwfoX0AED5Hh.jpg', false),
    new Location(31.90537214457491, 35.19275284326636), 10, new Date(), false),

    new Report("Broken street light Solved", 'https://www.rothlehner.de/wp-content/uploads/2017/06/GSR-Kommunal-LKW-Arbeitsb%C3%BChne-140TJV-35to-Einsatz-Stra%C3%9Fenbeleuchtung.jpg',
    new User('Municipality', 'test@test.com', '123', 'https://melbournechapter.net/images/government-clipart-municipality-3.png', false),
    new Location(31.90675938835044, 35.189086933782164), 50, new Date(), false),

    new Report("holes in water pipes", 'https://westernnews.media.clients.ellingtoncms.com/img/photos/2017/09/15/NPS_photo-Transcanyon_waterline.jpg',
    new User('Yazan', 'test@test.com', '123', 'https://www.w3schools.com/howto/img_avatar.png', false),
    new Location(31.90335907697418, 35.18656923353228), 100, new Date(), false),

    new Report("our rubbish is full", 'http://www.dcwastemanagement.co.uk/wp-content/uploads/2012/03/skip1.jpg',
    new User('Yazan', 'test@test.com', '123', 'https://www.w3schools.com/howto/img_avatar.png', false),
    new Location(31.89704387897999, 35.18742754025334), 18, new Date(), false)];


  private onMyRouteReports: Report[] = [];


  addReport(report: Report) {
    this.report.push(report);
  }


  getReports() {
    return this.report.slice();
  }

  updateReport(index: number, report: Report) {
    this.report[index] = report;
  }

  removeReport(index: number) {
    this.report.splice(index, 1);
  }


  addOnMyRouteReport(report: Report) {
    this.onMyRouteReports.push(report);
  }


  getOnMyRouteReports() {

    return this.onMyRouteReports.slice();
  }


  removeOnMyRouteReport(index: number) {
    this.onMyRouteReports.splice(index, 1);
  }

  removeOnMyRouteReports() {
    this.onMyRouteReports = [];
  }

}
