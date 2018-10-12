import {Injectable} from '@angular/core';
import {Report} from "../models/report";
import {User} from "../models/user";
import {Location} from "../models/location";

@Injectable()
export class ReportService {

  private report: Report[] = [
    new Report (
      "broken street light ",
    '../../assets/imgs/broken-light.jpg',
    new User('nibras','test@test.com','123','https://www.w3schools.com/howto/img_avatar2.png', true),
    new Location(31.898043, 35.204269),
      0,
      '10h'),

    new Report (
      "garbage in street",
    '../../assets/imgs/garbage-dirty-street.jpg',
    new User('nibras','test@test.com', '123','https://www.w3schools.com/howto/img_avatar2.png', true),
    new Location(31.898043, 35.204269),
      0,
      '15h'),


    new Report (
      "garbage",
      '../../assets/imgs/garbage-dirty-street.jpg',
      new User('nibras','test@test.com', '123','https://www.w3schools.com/howto/img_avatar2.png', false),
      new Location(31.898043, 35.204269),
      0,
      '7h')
  ];


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
