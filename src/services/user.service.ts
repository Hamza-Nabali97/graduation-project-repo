import {User, UserDoc} from "../models/user";
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class UserService {

  private loginUser = {} as User;
  private users: UserDoc[] = [];
  private usersCollection: AngularFirestoreCollection<User>;
  // flag: any;

  constructor(public db: AngularFirestore, private angularFire: AngularFireAuth) {
    this.usersCollection = this.db.collection("users");
  }


  // checkUserEmail(email: string) {
  //
  //   this.db.collection('users', ref => ref.where('emailAddress', '==', email).limit(1)).get()
  //     .subscribe((querySnapshot) => {
  //       console.log(querySnapshot.size);
  //     this.update(querySnapshot.size);
  //     });
  //   this.update(0);
  // }
  //
  // update(flag: any) {
  //   this.flag = flag;
  // }

  setLoginUser(email: string) {
    console.log("in");
    this.db.collection('users', ref => ref.where('emailAddress', '==', email).limit(1)).get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.loginUser.name = doc.data().name;
          this.loginUser.uid = doc.data().uid;
          this.loginUser.emailAddress = doc.data().emailAddress;
          this.loginUser.image = doc.data().image;
          this.loginUser.anonymous = doc.data().anonymous;


        })
      });
    console.log(this.loginUser);
  }

  getLoggedInUser() {
    return this.loginUser;
  }

  setGuestUserLogin(guestUser: User) {
    this.loginUser = guestUser;
  }


  setUsers(users: UserDoc[]) {
    this.users = users;
  }


  addUser(user: User) {

    const data = {
      name: user.name,
      emailAddress: user.emailAddress,
      image: user.image,
      anonymous: user.anonymous,
      uid: user.uid
    };

    this.usersCollection.add(data);
  }

}

