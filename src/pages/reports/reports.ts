import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public alertCtrl: AlertController) {
  }

}
