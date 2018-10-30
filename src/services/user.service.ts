import {User, UserDoc} from "../models/user";

export class UserService {

  private loginUser: UserDoc;


  setLoginUser(user: UserDoc) {

    console.log(user);

    this.loginUser = user;
  }

  getLoginUser() {
    return this.loginUser;
  }


  // public anonymous: false;

  // signIn() {
  //   this.loginUser = new User('Yazan', 'test@test.com', '123', 'https://www.w3schools.com/howto/img_avatar2.png', false);
  // }

  // reportAsAnonymous() {
  //   this.loginUser.anonymomus = true;
  // }

  // getLoginUser(anonymous) {
  //   this.signIn();
  //
  //   if (anonymous) {
  //     this.reportAsAnonymous();
  //     console.log("Anonymous status is " + anonymous)
  //   }
  //   return this.loginUser;
  // }


}

