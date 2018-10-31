import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language";
import {LoginPage} from "../login/login";

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  constructor(private platform: Platform, private languageService: LanguageService, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.changeDirection(language);
    this.languageService.setLanguage(language);
    this.navCtrl.push(LoginPage);

  }


  changeDirection(language:string) {
    if (language == 'en')
      this.platform.setDir('ltr', true)
    else
      this.platform.setDir('rtl', true);

  }

}
