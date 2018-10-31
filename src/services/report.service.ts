import {Injectable} from '@angular/core';
import {Report, ReportDoc} from "../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable()
export class ReportService {

  private reports: ReportDoc[] = [];
  private onMyRouteReports: Report[] = [];

  reportsCollection: AngularFirestoreCollection<Report>;

  constructor(public db: AngularFirestore) {
    this.reportsCollection = this.db.collection("reports");
  }

  setReports(reports: ReportDoc[]) {
    this.reports = reports;
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
