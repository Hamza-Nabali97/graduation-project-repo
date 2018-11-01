import {Component} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';
import {ReportService} from "../../services/report.service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  constructor(public viewCtrl: ViewController, private reportsService: ReportService, private angularFire: AngularFireAuth) {

  }

  close() {
    this.viewCtrl.dismiss();
  }


  sortByRecentReports() {
    this.reportsService.sortByRecentReports();
    this.close();
  }

  sortByMostVotedReports() {
    this.reportsService.sortByMostVotedReports();
    this.close();
  }

  myReport() {
    this.reportsService.displayMyReports();
    this.close();
  }

}
