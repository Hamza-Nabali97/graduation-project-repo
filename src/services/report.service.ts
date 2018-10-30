import {Injectable} from '@angular/core';
import {Report, ReportDoc} from "../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable()
export class ReportService {

  reports: ReportDoc[] = [];

  reportsCollection: AngularFirestoreCollection<Report>;

  constructor(public db: AngularFirestore) {
    this.reportsCollection = this.db.collection("reports");
  }


  private onMyRouteReports: Report[] = [];


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
    return this.reports;
  }


  // updateReport(index: number, report: Report) {
  //   this.report[index] = report;
  // }
  //
  // removeReport(index: number) {
  //   this.report.splice(index, 1);
  // }


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
