import { Injectable, inject } from "@angular/core";
import { Category } from "../models/category";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class CategoryService {
  private readonly url = "http://localhost:3000/people";
  private readonly http = inject(HttpClient);

  add(category: Category) {
    return this.http.post<Category>(this.url, category);
  }

  update(category: Category) {
    const url = `${this.url}/${category.id}`;
    return this.http.put<any>(url, category);
  }

  get(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.get<Category>(url);
  }

  delete(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.delete<Category>(url);
  }

  getAll() {
    return this.http.get<Category[]>(this.url).pipe(delay(300));
  }
}
