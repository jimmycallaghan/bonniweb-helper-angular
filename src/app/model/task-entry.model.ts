import {Attempt} from './attempt.model';
import {TaskSubmissionResponse} from './task-submission-response.model';

export class TaskEntry {
  constructor(public assignid: number,
              public courseName: string,
              public taskName: string,
              public dueDate: Date,
              public taskSubmissionResponse: TaskSubmissionResponse) {
  }

  get error(): string {
    return this.taskSubmissionResponse ? this.taskSubmissionResponse.serverError : '';
  }

  get timesubmitted(): Date {
    if (!this.issubmitted) {
      return null;
    }
    if (this.taskSubmissionResponse && this.taskSubmissionResponse.lastattempt && this.taskSubmissionResponse.lastattempt.submission) {
      return new Date(this.taskSubmissionResponse.lastattempt.submission.timecreated * 1000);
    } else {
      return null;
    }
  }

  get issubmitted(): boolean {
    if (this.taskSubmissionResponse && this.taskSubmissionResponse.lastattempt && this.taskSubmissionResponse.lastattempt.submission) {
      return this.taskSubmissionResponse.lastattempt.submission.status === 'submitted';
    } else {
      return false;
    }
  }
}
