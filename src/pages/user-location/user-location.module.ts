import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLocationPage } from './user-location';

@NgModule({
  declarations: [
    UserLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLocationPage),
  ],
})
export class UserLocationPageModule {}
