import {User} from "./user";

export class Report {
  constructor(public description: string,
              public images: string[],
              public user: User,
              public numberOfVotes: number,
              public createdDate: any) {
  }
}
