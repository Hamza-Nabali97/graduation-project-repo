import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Report} from "../../models/report";
import {LoadingController, AlertController} from 'ionic-angular';
import {ReportService} from '../../services/report.service';

/**
 /**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  // report: Report = {
  //   key: '',
  //   user: '',
  //   location: [51.678418, 7.809007],
  //   time: "12-1-2018",
  //   img: "../.../assets/imgs/rubbish.jpg",
  //   description: "pla pla pla",
  //   votes: 5
  // };
  //
  // index: number;
  //
  // title: string = 'Report Details';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  //
  // constructor(
  //   public navCtrl: NavController,
  //   public navParams: NavParams,
  //   private reportService: ReportService) {
  //   this.report.key = "1";
  //   this.report.user = "Nibras";
  //   this.report.description = "pla pla pla";
  //   this.report.votes = 10;
  //   this.report.img = "../../assets/imgs/rubbish.jpg";
  //   this.report.time = "12/1/2019";
  //   this.report.location[0] = 51.678418;
  //   this.report.location[1] = 7.809007;
  //   console.log(this.report.location[0], this.report.location[1])
  // }
  //
  //
  //
  //
  //
  //
  //
  // onDeletereport() {
  //   this.reportService.removeReport(this.index);
  //   this.navCtrl.popToRoot();
  // }

}
