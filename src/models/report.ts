import {User} from "./user";
import {Location} from "./location";

export class Report {
  constructor(public description: string,
              public image: string,
              public user: User,
              public location: Location,
              public numberOfVotes: number,
              public createdDate: Date) {
  }
}

