
/*
import {User} from "./user";
import {Location} from "./location";

export class Report {
  constructor(public description: string,
              public image: string,
              public user: User,
              public location: Location,
              public numberOfVotes: number,
              public createdDate: Date,
              public voted: boolean //for vote click only
  ) {
  }
}
*/
export interface Report {
  ownerId: string;
  description: string;
  location: { Latitude: number, Longitude: number };
  image: string;
  createdDate: Date;
  status: string;
  lastUpdate: Date;
  whoAgree: string[];
}

export interface ReportDoc {
  reportId: string;
  report: Report;
}
