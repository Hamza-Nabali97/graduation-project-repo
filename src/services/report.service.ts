import {Injectable} from '@angular/core';
import {Report, ReportDoc} from "../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ReportService {

  private reports: ReportDoc[] = [];
  private onMyRouteReports: Report[] = [];

  private subjectReports = new Subject<ReportDoc[]>();
  private subjectRouteReports = new Subject<Report[]>();

  reportsCollection: AngularFirestoreCollection<Report>;

  constructor(public db: AngularFirestore) {
    this.reportsCollection = this.db.collection("reports");
  }

  setReports(reports: ReportDoc[]) {
    this.reports = reports;
    this.subjectReports.next(this.reports);
  }

  setRouteReports(reports: Report[]) {
    this.onMyRouteReports = reports;
    this.subjectRouteReports.next(this.onMyRouteReports);
  }


  getSubjectReports(): Observable<ReportDoc[]> {
    return this.subjectReports;
  }

  getSubjectRouteReports(): Observable<Report[]> {
    return this.subjectRouteReports;
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
