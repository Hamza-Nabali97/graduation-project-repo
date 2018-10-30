import {Component, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {ReportService} from "../../services/report.service";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {Report, ReportDoc} from "../../models/report";
import {Subscription} from "rxjs/Rx";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage implements OnDestroy {


  reports: ReportDoc[] = [];
  index: number;
  subscription: Subscription;
  reportsCollection: AngularFirestoreCollection<Report>;


  constructor(public db: AngularFirestore, public reportService: ReportService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private angularFire: AngularFireAuth, public popoverCtrl: PopoverController) {


    this.reportsCollection = this.db.collection("reports");

    this.subscription = this.reportsCollection.snapshotChanges().subscribe(value => {

      this.reports = [];
      value.forEach(value1 => {
        this.reports.push({reportId: value1.payload.doc.id, report: value1.payload.doc.data()});
      });
    });
    reportService.reports = this.reports;
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
    const params = {report: this.reports[index].report, index: index}
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // toggle(index) {
  //   if (this.reports[index].voted == false) {
  //     this.reports[index].numberOfVotes += 1;
  //     this.reports[index].voted = true;
  //   }
  //
  //   else if (this.reports[index].voted == true) {
  //     this.reports[index].numberOfVotes -= 1;
  //     this.reports[index].voted = false;
  //   }
  // }


}
