import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";

@IonicPage()
@Component({
  selector: 'page-my-reports',
  templateUrl: 'my-reports.html',
})
export class MyReportsPage {

  reports: Report[] = [];
  index: number;


  constructor(public reportService: ReportService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {

  }


  ionViewWillEnter() {
    this.reports = this.reportService.getReports();
  }


  onAddReport() {
    this.navCtrl.push(AddReportPage);

  }


  onShowReport(index: number) {
    const params = {report: this.reports[index], index: index}
    this.navCtrl.push(ReportPage, params);
  }


  getTimeAgo(report: Report) {
    return moment(report.createdDate).fromNow();
  }

  options(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage);
    popover.present({
      ev: myEvent
    });
  }

}
