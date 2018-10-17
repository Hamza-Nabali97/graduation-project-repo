import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {ReportService} from "../../services/report.service";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {Report} from "../../models/report";


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {


  reports: Report[] = [];
  index: number;

  constructor(public reportService: ReportService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private angularFire: AngularFireAuth, public popoverCtrl: PopoverController) {
  }


  ionViewWillEnter() {
    this.reports = this.reportService.getReports();
    console.log(this.reports);
  }

  ionViewDidLoad() {
    let toast = this.toastCtrl.create({
      duration: 3000,
    });
    this.angularFire.authState.subscribe(loggedInUser => {
      if (loggedInUser && loggedInUser.uid) {
        if (loggedInUser.isAnonymous) {
          toast.setMessage('Logged ')
        }
      }
    })
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

  toggle(index) {
    if (this.reports[index].voted == false) {
      this.reports[index].numberOfVotes += 1;
      this.reports[index].voted = true;
    }

    else if (this.reports[index].voted == true) {
      this.reports[index].numberOfVotes -= 1;
      this.reports[index].voted = false;
    }
  }


}
