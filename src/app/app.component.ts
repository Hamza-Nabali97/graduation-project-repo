import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, LoadingController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {ReportsPage} from "../pages/reports/reports";
import {InboxPage} from "../pages/inbox/inbox";
import {OnMyRoutePage} from "../pages/on-my-route/on-my-route";
import {SettingsPage} from "../pages/settings/settings";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../services/language";
import {AngularFireAuth} from 'angularfire2/auth';
import {ReportService} from "../services/report.service";
import {UserService} from "../services/user.service";
import {LanguagePage} from "../pages/language/language";
import {UserLocationPage} from "../pages/user-location/user-location";
import {timer} from "rxjs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LanguagePage;
  loginPage = LoginPage;
  reportsPage = ReportsPage;
  inboxPage = InboxPage;
  onMyRoutePage = OnMyRoutePage;
  settingsPage = SettingsPage;
  contactUs = ContactUsPage;
  showSplash = true;

  @ViewChild('content') content: NavController;

  constructor(private userService: UserService, public reportService: ReportService, private languageService: LanguageService, private translate: TranslateService,
              public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private menuCtrl: MenuController, private loadingCtrl: LoadingController, private angularFireAuth: AngularFireAuth) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
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

  userLogout() {
    // let loader = this.loadingCtrl.create({
    //   spinner: 'circles',
    //   content: 'Logging Out',
    //   duration: 10,
    // });
    // loader.present().then(() => {
    this.angularFireAuth.auth.signOut().then(() => {
      this.userService.setLoginUser(null);
      this.reportService.setReports([]);
      this.openPage(LoginPage);
      // loader.dismiss();

    })
      .catch((error) => {
        // loader.dismiss();
      })
  }


}
