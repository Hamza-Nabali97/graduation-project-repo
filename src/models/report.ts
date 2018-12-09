export interface Report {
  createdDate: Date;
  description: string;
  image: string;
  lastUpdate: Date;
  location: { lat: number, lng: number };
  ownerId: string;
  ownerName: string;
  ownerImage: string;
  status: string;
  whoAgree: string[];
}

export interface ReportDoc {
  reportId: string;
  report: Report;
}
