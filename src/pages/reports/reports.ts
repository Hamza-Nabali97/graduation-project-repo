import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  visible = false;

  toggle() {
    this.visible = !this.visible;
  }

  onAddReport() {
    const params = {mode: 'New'}
    this.navCtrl.push(AddReportPage, params);
  }

  onShowReport() {
    const params = {mode: 'Details'}
    this.navCtrl.push(ReportPage, params);
  }


}
