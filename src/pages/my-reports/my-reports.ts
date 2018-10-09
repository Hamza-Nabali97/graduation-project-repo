import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Location} from "../../models/location";
import {Geolocation} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-my-reports',
  templateUrl: 'my-reports.html',
})
export class MyReportsPage {

  myReports: Report[] = [];
  index: number;

  constructor(
    public reportService: ReportService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation) {

  }


  ionViewWillEnter() {
    this.myReports = this.reportService.getReports();
  }


  onAddReport() {
    this.navCtrl.push(AddReportPage);
  }


  onShowReport(index:number) {
    const params = {report: this.myReports[index], index: index}
    this.navCtrl.push(ReportPage, params);
  }
}
