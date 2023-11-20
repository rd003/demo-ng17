import { Injectable, inject } from "@angular/core";
import { Observable, delay } from "rxjs";
import { Todo } from "./todo.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class TodoService {
  private readonly url = "http://localhost:3000/todos";
  private readonly http = inject(HttpClient);

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo).pipe(delay(600));
  }

  update(todo: Todo): Observable<any> {
    return this.http.put<any>(`${this.url}/${todo.id}`, todo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(delay(600));
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.url}/${id}`);
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(delay(600));
  }
}
