import {User} from "../models/user";

export class UserService {

  public loginUser:User;


  signIn(){
    this.loginUser=new User('yazan','test@test.com','123','https://www.w3schools.com/howto/img_avatar2.png');
  }

  getLoginUser(){
    this.signIn();
    return this.loginUser;
  }


}

