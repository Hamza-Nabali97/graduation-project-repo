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


import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = LoginPage;
  reportsPage: ReportsPage;
  inboxPage = InboxPage;
  onMyRoutePage = OnMyRoutePage;
  settingsPage = SettingsPage;
  contactUs = ContactUsPage;
  @ViewChild('content') content: NavController;

  pages: Array<{title: string, component: any}>;

  constructor(private languageService: LanguageService, private translate: TranslateService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
