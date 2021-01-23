import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from './model/login-response.model';
import {TasksResponse} from './model/tasks-response.model';
import {TaskEntry} from './model/task-entry.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bonni-helper';

  token: string;
  tasks: TaskEntry[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.post<LoginResponse>('http://localhost:8080/login', null)
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
                this.tasks.push(new TaskEntry(courseName, 'No tasks', new Date(0)));
              } else {
                course.assignments.forEach(assignment => {
                  this.tasks.push(new TaskEntry(courseName, assignment.name, new Date(assignment.duedate * 1000)));
                });
              }
            });

            this.tasks = this.tasks.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());

            console.log(this.tasks);
          });
      });
  }
}
