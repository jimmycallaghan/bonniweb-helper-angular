import {Attempt} from './attempt.model';

export class TaskSubmissionResponse {
  constructor(public lastattempt: Attempt, public warnings: [], public serverError: string) {}
}
