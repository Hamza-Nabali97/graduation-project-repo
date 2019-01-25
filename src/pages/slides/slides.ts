import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LanguagePage} from "../language/language";
import {Push, PushObject, PushOptions} from '@ionic-native/push';

/**
 * Generated class for the SlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage implements OnInit {

  constructor(public navCtrl: NavController, private push: Push) {

  }


  navigate() {
    this.navCtrl.push(LanguagePage);
  }

  slides = [
    {
      title: "Welcome to Our App!",
      description: "<b>App Documentation</b> The Application   utilizes the power of human computing to provide services to citizens.",
      image: "assets/imgs/slide1.jpg",
    },
    {
      title: "What is Human Computaion?",
      description: "<b>Human Computaion</b> Human Computation allows use of human effort in decision making process while solving critical problems. It becomes much essential when dealing with problems that even computer systems cannot solve.",
      image: "assets/imgs/slide2.png",
    },
    {
      title: "Motivations",
      description: "The main aim of our human computation platform is to strengthen communications between citizens and responsible authorities in order to enhance collaboration on solving different kinds of problem in our country.",
      image: "assets/imgs/slide3.png",
    }
  ];

  ngOnInit(): void {

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '775594715599'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

}
