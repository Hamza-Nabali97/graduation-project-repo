import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {AddReportPage} from "../pages/add-report/add-report";
import {MyReportsPage} from "../pages/my-reports/my-reports";
import {ReportsPage} from "../pages/reports/reports";
import {ReportPage} from "../pages/report/report";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = ReportsPage;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
