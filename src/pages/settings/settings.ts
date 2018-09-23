import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  language = 'en';

  constructor(private languageService: LanguageService, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    this.translate.use(this.languageService.getLanguage());
  }

  onChange() {
    this.translate.use(this.language);
    this.languageService.setLanguage(this.language);
  }


}
