import { Injectable, inject } from "@angular/core";
import { PersonModel } from "../models/person.model";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class PersonService {
  private readonly url = "http://localhost:3000/people";
  private readonly http = inject(HttpClient);

  add(person: PersonModel) {
    return this.http.post<PersonModel>(this.url, person);
  }

  update(person: PersonModel) {
    const url = `${this.url}/${person.id}`;
    return this.http.put<any>(url, person);
  }

  get(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.get<PersonModel>(url);
  }

  delete(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.delete<PersonModel>(url);
  }

  getAll() {
    return this.http.get<PersonModel[]>(this.url).pipe(delay(300));
  }
}
