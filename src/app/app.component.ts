import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ReportsPage} from "../pages/reports/reports";
import {InboxPage} from "../pages/inbox/inbox";
import {OnMyRoutePage} from "../pages/on-my-route/on-my-route";
import {SettingsPage} from "../pages/settings/settings";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../services/language";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = ReportsPage;
  inboxPage = InboxPage;
  onMyRoutePage = OnMyRoutePage;
  settingsPage = SettingsPage;
  contactUs = ContactUsPage;
  @ViewChild('content') content: NavController;


  constructor(private languageService: LanguageService, private translate: TranslateService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  openPage(page: any) {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }

  initTranslate() {
    this.translate.setDefaultLang(this.languageService.getLanguage());
    this.translate.use(this.languageService.getLanguage());
    this.changeDirection();
  }

  changeDirection() {
    if (this.languageService.getLanguage() == 'en')
      this.platform.setDir('ltr', true)
    else
      this.platform.setDir('rtl', true);
  }


}
