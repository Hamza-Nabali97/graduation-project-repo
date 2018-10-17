import {Component} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
