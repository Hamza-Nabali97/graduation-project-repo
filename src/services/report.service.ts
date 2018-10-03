import {Injectable} from '@angular/core';
import {Report} from "../models/report.model";

@Injectable()
export class ReportService {

  private report: Report[] = [];

  constructor() {
  }

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
