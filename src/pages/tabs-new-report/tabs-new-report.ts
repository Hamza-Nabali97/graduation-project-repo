import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {AddReportPage} from "../add-report/add-report";
import {WifiPage} from "../wifi/wifi";

/**
 * Generated class for the TabsNewReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-new-report',
  templateUrl: 'tabs-new-report.html',
})
export class TabsNewReportPage {

  addReport=AddReportPage;
  wifiPage=WifiPage;


}
