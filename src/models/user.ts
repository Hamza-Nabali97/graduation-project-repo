export interface UserLogin {
  emailAddress: string;
  password: string;
}


export interface User {
  anonymous: boolean;
  emailAddress: string;
  image: string;
  name: string;
  uid: string;


}

export interface UserDoc {
  userId: string;
  user: User;
}
