export class Submission {
  constructor(public id: number,
              public userid: number,
              public attemptnumber: number,
              public timecreated: number,
              public timemodified: number,
              public status: string,
              public groupid: number,
              public assignment: number,
              public latest: number) {
  }
}
