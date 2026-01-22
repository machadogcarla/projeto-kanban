import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
     return this.http
    .get<Task[]>(this.apiUrl)
    .pipe(delay(1000));
  }

  getTaskById(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${id}`);
  }

  postTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  editTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
