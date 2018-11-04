import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  IonicPage, Loading,
  LoadingController,
  NavController,
  NavParams,
  PopoverController,
  ToastController
} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {ReportService} from "../../services/report.service";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";
import {ReportPage} from "../report/report";
import {AddReportPage} from "../add-report/add-report";
import {Report, ReportDoc} from "../../models/report";
import {Subscription} from "rxjs/Rx";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage implements OnDestroy,OnInit {

  reports: ReportDoc[] = [];
  index: number;
  subscription: Subscription;
  reportsCollection: AngularFirestoreCollection<Report>;

  constructor(private loadingCtrl: LoadingController, private userService: UserService, public db: AngularFirestore, public reportService: ReportService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private angularFire: AngularFireAuth, public popoverCtrl: PopoverController) {

    this.reportsCollection = this.db.collection("reports");


    this.subscription = this.reportsCollection.snapshotChanges().subscribe(value => {

      let loader = this.loadingCtrl.create({
        content: 'Loading Data ...',
        spinner: 'dots'
      });

      loader.present();
      this.reports = [];
      value.forEach((value1, index: number) => {
        this.reports.push({reportId: value1.payload.doc.id, report: value1.payload.doc.data()});
      });
      this.reportService.setReports(this.reports);
      loader.dismiss();
    });

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


  getTimeAgo(date: Date) {
    return moment(date).fromNow();
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
  ngOnInit(){}

  toggle(report: ReportDoc) {
    let uid: string = this.angularFire.auth.currentUser.uid;
    if (report.report.whoAgree.indexOf(uid) < 0) {
      report.report.whoAgree.push(uid);
      this.reportsCollection.doc(report.reportId).update(report.report);
    }
    else {
      report.report.whoAgree.splice(report.report.whoAgree.indexOf(uid), 1);
      this.reportsCollection.doc(report.reportId).update(report.report);
    }

  }

}
