import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";
import * as moment from 'moment';
import {ReportPage} from "../report/report";


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  onMyRouteReports: Report[] = [];

  constructor(private reportService: ReportService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.onMyRouteReports = this.reportService.getOnMyRouteReports();
  }

  getTimeAgo(report: Report) {
    return moment(report.createdDate).fromNow();
  }

  onShowReport(index: number) {
    const params = {report: this.onMyRouteReports[index], index: index}
    this.navCtrl.push(ReportPage, params);
  }

  toggle(index) {
    if (this.onMyRouteReports[index].voted == false) {
      this.onMyRouteReports[index].numberOfVotes += 1;
      this.onMyRouteReports[index].voted = true;
    }

    else if (this.onMyRouteReports[index].voted == true) {
      this.onMyRouteReports[index].numberOfVotes -= 1;
      this.onMyRouteReports[index].voted = false;
    }
  }


}
