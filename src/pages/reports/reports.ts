import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {ReportService} from "../../services/report.service";
import * as moment from 'moment';
import {OptionsPage} from "../options/options";
import {ReportPage} from "../report/report";
import {Report, ReportDoc} from "../../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {TabsNewReportPage} from "../tabs-new-report/tabs-new-report";
import {LanguageService} from "../../services/language";


@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage implements OnDestroy, OnInit {

  loginUser: User;
  reports: ReportDoc[];
  reportsCollection: AngularFirestoreCollection<Report>;

  constructor(private languageService: LanguageService, private loadingCtrl: LoadingController, private userService: UserService, public db: AngularFirestore, public reportService: ReportService, public navCtrl: NavController, public navParams: NavParams, private angularFire: AngularFireAuth, public popoverCtrl: PopoverController) {
    moment.locale(this.languageService.getLanguage());
    this.reportsCollection = this.db.collection("reports");
    let loader = this.loadingCtrl.create({
      content: 'Loading Data ...',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.reports = this.reportService.loadData();
      this.loginUser = this.userService.getLoggedInUser();
      loader.dismiss();
    });

  }


  ionViewDidLoad() {

  }

  onAddReport() {
    // this.navCtrl.push(AddReportPage);
    this.navCtrl.push(TabsNewReportPage);

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
    this.reports = [];
  }

  ngOnInit() {
  }

  toggle(report: ReportDoc) {
    let uid: string = this.angularFire.auth.currentUser.uid;
    if (report.report.whoAgree.indexOf(uid) < 0) {
      report.report.whoAgree.push(uid);
      this.reportsCollection.doc(report.reportId).update(report.report);
    } else {
      report.report.whoAgree.splice(report.report.whoAgree.indexOf(uid), 1);
      this.reportsCollection.doc(report.reportId).update(report.report);
    }

  }

}
