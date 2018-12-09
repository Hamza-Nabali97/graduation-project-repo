import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Report} from "../../models/report";


@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage implements OnInit{

  report: Report;
  index: number;

  title: string = 'Report Details';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }


  ngOnInit(): void {
    this.report = this.navParams.get('report');
    this.index = this.navParams.get('index');
  }

  // onDeletereport() {
  //   this.reportService.removeReport(this.index);
  //   this.navCtrl.popToRoot();
  // }
}
