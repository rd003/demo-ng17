import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { PersonService } from "../shared/data-access/person.service";
import { rxState } from "@rx-angular/state";
import { PersonModel } from "../shared/models/person.model";
import { AsyncPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { NEVER, catchError, endWith, map, of, startWith, tap } from "rxjs";
import { generateGUID } from "../shared/utils/generateGUID";

// export interface PersonState {
//   people: PersonModel[];
//   loading: boolean;
//   error: HttpErrorResponse | null;
// }

@Component({
  selector: "app-people-rx",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h2>People</h2>
    <button (click)="onSubmit()">Add</button>
    @if(error$|async){ error } @if(loading$|async){ loading.... } @else {
    <ul>
      @for (person of people$|async; track $index) {
      <li style="list-style: none;">
        {{ person.name }} | {{ person.email }} |
      </li>
      } @empty {
      <div>No items found</div>
      }
    </ul>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleRxComponent {
  private personService = inject(PersonService);
  private state = rxState<{
    people: PersonModel[];
    loading: boolean;
    error: HttpErrorResponse | null;
  }>(({ set, connect }) => {
    set({ people: [], loading: false, error: null });
    connect(
      this.personService.getAll().pipe(
        map((peopleData) => ({ people: peopleData })),
        catchError((error) => of({ error })),
        startWith({ loading: true }),
        endWith({ loading: false })
      )
    );
  });

  people$ = this.state.select("people");
  loading$ = this.state.select("loading");
  error$ = this.state.select("error");

  onSubmit() {
    const person: PersonModel = {
      id: generateGUID(),
      name: "hadsf",
      email: "abc@gmail.com",
    };
    const addPerson$ = this.personService.add(person);
    addPerson$
      .pipe(
        tap((response) => {
          this.addPersonState(response);
        }),
        catchError((error) => {
          console.log(error);
          this.setError(error);
          return NEVER;
        })
      )
      .subscribe();
  }

  addPersonState(person: PersonModel) {
    this.state.set((state) => ({
      ...state,
      people: [...state.people, person],
      loading: false,
    }));
  }

  setError(error: HttpErrorResponse) {
    this.state.set((state) => ({
      ...state,
      error,
      loading: false,
    }));
  }

  setLoading(loading: boolean) {
    this.state.set((state) => ({
      ...state,
      loading,
    }));
  }
}
