import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  language: any;

  constructor(private platform: Platform, private languageService: LanguageService, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);

  }


  onChange() {
    this.translate.use(this.language);
    this.changeDirection();
    this.languageService.setLanguage(this.language);
  }

  changeDirection() {
    if (this.language == 'en')
      this.platform.setDir('ltr', true)
    else
      this.platform.setDir('rtl', true);

  }
}
