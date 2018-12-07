import {Injectable} from '@angular/core';
import {Report, ReportDoc} from "../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class ReportService {

  private reports: any[] = [];
  private onMyRouteReports: Report[] = [];
  private visableReport: ReportDoc[] = [];
  private reportsCollection: AngularFirestoreCollection<Report>;

  constructor(public db: AngularFirestore, private angularFire: AngularFireAuth) {
    this.reportsCollection = this.db.collection("reports");
  }


  setReports(reports: any) {
    this.reports = reports;
    this.visableReport = this.reports;

  }

  loadData() {
    this.reports = []
    this.reportsCollection.get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.reports.push({reportId: doc.id, report: doc.data()})
        })
      });
    this.visableReport = this.reports;
    return this.reports;
  }


  getVisibleReports() {
    return this.visableReport;
  }

  displayMyReports() {
    const uid = this.angularFire.auth.currentUser.uid;
    this.visableReport = this.reports.filter(value => value.report.ownerId === uid);
  }

  sortByRecentReports() {
    this.visableReport = this.reports;
    this.visableReport.sort((a, b) => a.report.createdDate > b.report.createdDate ? -1 : a.report.createdDate < b.report.createdDate ? 1 : 0)
  }


  sortByMostVotedReports() {
    this.visableReport = this.reports;
    this.visableReport.sort((a, b) => a.report.whoAgree.length > b.report.whoAgree.length ? -1 : a.report.whoAgree.length < b.report.whoAgree.length ? 1 : 0)
  }


  setRouteReports(reports: Report[]) {
    this.onMyRouteReports = reports;
  }

  addReport(report: Report) {
    const data = {
      ownerId: report.ownerId,
      description: report.description,
      location: report.location,
      image: report.image,
      createdDate: report.createdDate,
      status: report.status,
      lastUpdate: report.lastUpdate,
      whoAgree: report.whoAgree
    };

    this.reportsCollection.add(data);
  }

  getReports() {
    return this.reports.slice();
  }


  addOnMyRouteReport(report: Report) {
    this.onMyRouteReports.push(report);
  }


  getOnMyRouteReports() {

    return this.onMyRouteReports.slice();
  }


  removeOnMyRouteReport(index: number) {
    this.onMyRouteReports.splice(index, 1);
  }

  removeOnMyRouteReports() {
    this.onMyRouteReports = [];
  }

}
