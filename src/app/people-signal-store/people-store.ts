import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { PersonModel } from "../shared/models/person.model";
import { inject } from "@angular/core";
import { PersonService } from "../shared/data-access/person.service";
import { HttpErrorResponse } from "@angular/common/http";
import { pipe, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";

type State = {
  people: PersonModel[];
  loading: boolean;
  error: HttpErrorResponse | null;
};

const initialState: State = {
  people: [],
  loading: true,
  error: null,
};

export const PersonStore = signalStore(
  withState<State>(initialState),
  withMethods((store, personService = inject(PersonService)) => ({
    add(person: PersonModel) {
      const newData: PersonModel[] = [...store.people(), person];
      patchState(store, { people: newData, loading: false });
    },
    setLoading() {
      patchState(store, { loading: true });
    },
    loadPeople: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap(() => {
          return personService.getAll().pipe(
            tapResponse({
              next: (people) => {
                patchState(store, { people });
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
                patchState(store, { error });
              },
              finalize: () => {
                patchState(store, { loading: false });
              },
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit({ loadPeople }) {
      loadPeople();
    },
  })
);
