import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from './model/login-response.model';
import {TasksResponse} from './model/tasks-response.model';
import {TaskEntry} from './model/task-entry.model';
import {TaskSubmissionResponse} from './model/task-submission-response.model';
import {User} from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .rowGreen {
      background-color: #C8E6C9 !important;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'bonni-helper';

  token: string;
  tasks: TaskEntry[] = [];
  selectedUser: User;
  users: User[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.users = [
      new User('julian', 'call_jul', 'ABC123abd'),
      new User('leon', 'call_leo', 'Bobo!321')
    ];

    console.log(this.users);

    this.loadData('julian');
  }

  onChangeUser(): void {
    this.loadData(this.selectedUser.user);
  }

  loadData(user: string): void {

    this.tasks = [];

    let loginParams = new HttpParams();
    loginParams = loginParams.append('user', user);

    this.http.post<LoginResponse>('http://localhost:8080/login', null, {params: loginParams})
      .toPromise()
      .then((lr: LoginResponse) => {
        console.log(lr);
        this.token = lr.token;

        let params = new HttpParams();
        params = params.append('token', this.token);

        this.http.get<TasksResponse>('http://localhost:8080/tasks', {params})
          .toPromise()
          .then((data: TasksResponse) => {
            console.log(data);
            data.courses.forEach(course => {
              const courseName = course.fullname;
              if (course.assignments.length === 0) {
                this.tasks.push(new TaskEntry(null, courseName, 'No tasks', new Date(0), null));
              } else {
                course.assignments.forEach(assignment => {
                  console.log(assignment);
                  let subbyParams = new HttpParams();
                  subbyParams = subbyParams.append('token', this.token);
                  subbyParams = subbyParams.append('assignid', assignment.id + '');
                  this.http.get<TaskSubmissionResponse>('http://localhost:8080/tasksSubmission', {params: subbyParams})
                    .toPromise().then(submission => {
                    this.tasks.push(new TaskEntry(assignment.cmid, courseName, assignment.name, new Date(assignment.duedate * 1000), submission));
                    this.tasks = this.tasks.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
                  });
                });
              }
            });

            console.log(this.tasks);
          });
      });
  }
}
