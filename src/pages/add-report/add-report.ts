import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";
import {NgForm} from "@angular/forms";
import {ReportsPage} from "../reports/reports";
import {Report} from "../../models/report";
import {Location} from "../../models/location";
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-add-report',
  templateUrl: 'add-report.html',
})
export class AddReportPage {

  constructor(public userService: UserService, public reportService: ReportService, public navCtrl: NavController, public navParams: NavParams) {
  }


  onAddReport(form: NgForm) {
    this.reportService.addReport(new Report(form.value.description, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PM5544_with_non-PAL_signals.png/200px-PM5544_with_non-PAL_signals.png', this.userService.getLoginUser(), new Location(0, 0), 0, '12h'));
    form.reset();
    this.navCtrl.push(ReportsPage);
  }

}

