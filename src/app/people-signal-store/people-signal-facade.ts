import { patchState, signalState } from "@ngrx/signals";
import { PersonModel } from "../shared/models/person.model";
import { inject } from "@angular/core";
import { PersonService } from "../shared/data-access/person.service";
import { HttpErrorResponse } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

interface PersonState {
  people: PersonModel[];
  loading: boolean;
  error: HttpErrorResponse | null;
}
export class PeopleSignalFacade {
  private readonly personService = inject(PersonService);

  private state = signalState<PersonState>({
    people: [],
    loading: false,
    error: null,
  });

  people = this.state.people;
  loading = this.state.loading;
  error = this.state.error;

  add(person: PersonModel) {
    patchState(this.state, (state) => ({
      people: {
        ...state.people,
        person,
      },
      loading: false,
    }));
  }

  private setLoading() {
    patchState(this.state, { loading: true });
  }

  private setError(error: HttpErrorResponse) {
    patchState(this.state, { error });
  }

  constructor() {
    const people$ = this.personService.getAll();
    people$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => {
        // patchState(this.state, { loading: false, people: data });
        // patchState(this.state, (state) => ({ loading: false, people: data }));
        patchState(this.state, (state) => ({ loading: false, people: data }));
      },
      error: (error) => {
        this.setError(error);
      },
    });
    console.log(this.state());
  }
}
