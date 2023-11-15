import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./todo.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class TodoService {
  private readonly url = "http://localhost:3000/todos";
  private readonly http = inject(HttpClient);

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo);
  }

  update(todo: Todo): Observable<any> {
    return this.http.put<any>(`${this.url}\${todo.id}`, todo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}\${todo.id}`);
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.url}\${todo.id}`);
  }

  getAll(id: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}\${todo.id}`);
  }
}
