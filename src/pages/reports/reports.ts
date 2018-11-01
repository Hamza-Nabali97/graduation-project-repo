import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/report";
import {ReportDoc} from "../../models/report";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";
import {DatePipe} from "@angular/common";
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {Subscription} from "rxjs/Rx";
import {AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  reports: ReportDoc[] = [];
  index: number;
  subscription: Subscription;
  reportsCollection: AngularFirestoreCollection<Report>;


  constructor(public db: AngularFirestore, public reportService: ReportService, public navCtrl: NavController,
              public navParams: NavParams, private toastCtrl: ToastController, private angularFire: AngularFireAuth, public popoverCtrl: PopoverController) {


    this.reportsCollection = this.db.collection("reports");

    this.subscription = this.reportsCollection.snapshotChanges().subscribe(value => {

      this.reports = [];
      value.forEach(value1 => {
        this.reports.push({reportId: value1.payload.doc.id, report: value1.payload.doc.data()});
      });
    });
    console.log(this.reports);
  }

  onAddReport() {
    this.navCtrl.push(AddReportPage);

  }


  onShowReport(index: number) {
    /*const params = {report: this.reports[index], index: index}
    this.navCtrl.push(ReportPage, params);
 */ }


  getTimeAgo(date: Date) {
    return moment(date).fromNow();
  }

  options(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage);
    popover.present({
      ev: myEvent
    });
  }

  toggle(report: Report) {

  }
}
