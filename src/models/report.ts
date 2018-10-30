export interface Report {
  ownerId: string;
  description: string;
  location: { lat: number, lng: number };
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
