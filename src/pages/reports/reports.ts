import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  reports: Report[] = [];

  constructor(public reportService:ReportService,public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewWillEnter() {
    this.reports=this.reportService.getReports();
  }


  onAddReport() {
    this.navCtrl.push(AddReportPage);
  }


  onShowReport() {
    // const params = {mode: 'Details'}
    // this.navCtrl.push(ReportPage, params);
  }


}
