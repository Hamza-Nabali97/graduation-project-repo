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


  constructor(private translate: TranslateService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuCtrl: MenuController) {
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
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');


    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

  }

}
