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
export class ReportPage implements OnInit{

  report: Report;
  index: number;

  title: string = 'Report Details';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reportService: ReportService) {
  }


  ngOnInit(): void {
    this.report = this.navParams.get('report');
    this.index = this.navParams.get('index');
  }

  onDeletereport() {
    this.reportService.removeReport(this.index);
    this.navCtrl.popToRoot();
  }
}
