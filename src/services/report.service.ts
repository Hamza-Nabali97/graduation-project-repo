import {Injectable} from '@angular/core';
import {Report} from "../models/report";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable()
export class ReportService {

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
   /* console.log("before");
    this.reports= this.reportsCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return this.reports;
    */
  //  this.report.slice();
   //  return this.db.collection(`Reports`);
  }

  updateReport(index: number, report: Report) {
 //   this.report[index] = report;
  }

  removeReport(index: number) {
  //  this.report.splice(index, 1);
  }

  toggle(report: Report) {/*
    this.reportsCollectionRef.doc(this.report)
    if(this.reports[index].voted == false){
      this.reports[index].numberOfVotes+=1;
      this.reports[index].voted=true;
    }

    else if(this.reports[index].voted == true){
      this.reports[index].numberOfVotes-=1;
      this.reports[index].voted=false;}*/
  }
}
