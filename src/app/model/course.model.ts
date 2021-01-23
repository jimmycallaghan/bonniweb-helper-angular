import {Assignment} from './assignment.model';

export class Course {
  constructor(public id: number, public shortname: string, public fullname: string, public timemodified: number, public assignments: Assignment[]) {}
}
