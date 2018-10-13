import {User} from "../models/user";

export class UserService {

  public loginUser:User;
  public anonymous: false;

  signIn(){
    this.loginUser=new User('Nibras','test@test.com','123','https://www.w3schools.com/howto/img_avatar2.png', false);
  }

  reportAsAnonymous(){
    this.loginUser.anonymomus=true;
  }

  getLoginUser(anonymous){
    this.signIn();

    if(anonymous){
      this.reportAsAnonymous();
      console.log("Anonymous status is "+anonymous)
    }
    return this.loginUser;
  }


}

