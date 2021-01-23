import {Course} from './course.model';

export class TasksResponse {
  constructor(public courses: Course[]) {}
}
