import {Submission} from './submission.model';

export class Attempt {
  constructor(public submission: Submission,
              public submissionsenabled: boolean,
              public locked: boolean,
              public graded: boolean,
              public canedit: boolean,
              public caneditowner: boolean,
              public cansubmit: boolean,
              public extensionduedate: Date,
              public gradingstatus: string) {}
}
