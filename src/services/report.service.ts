import {Injectable} from '@angular/core';
import {Report} from "../models/report";
import {User} from "../models/user";
import {Location} from "../models/location";

@Injectable()
export class ReportService {

  private report: Report[] = [];


  addReport(report: Report) {
    this.report.push(report);
  }
  

  getReports() {

    return this.report.slice();
  }

  updateReport(index: number, report: Report) {
    this.report[index] = report;
  }

  removeReport(index: number) {
    this.report.splice(index, 1);
  }

}
