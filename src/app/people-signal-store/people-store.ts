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
    addPerson: rxMethod<PersonModel>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((person) => {
          return personService.add(person).pipe(
            tapResponse({
              next: (person) => {
                patchState(store, { people: [...store.people(), person] });
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
                patchState(store, { error });
              },
              finalize: () => patchState(store, { loading: false }),
            })
          );
        })
      )
    ),
    updatePerson: rxMethod<PersonModel>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((person) =>
          personService.update(person).pipe(
            tapResponse({
              next: () => {
                const updatePeople = store
                  .people()
                  .map((a) => (a.id === person.id ? person : a));
                patchState(store, { people: updatePeople });
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, { error });
              },
              finalize: () => {
                patchState(store, { loading: false });
              },
            })
          )
        )
      )
    ),
    deletPerson: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((id) =>
          personService.delete(id).pipe(
            tapResponse({
              next(value) {
                const updatedPeople = store.people().filter((a) => a.id !== id);
                patchState(store, { people: updatedPeople });
              },
              error(error: HttpErrorResponse) {
                patchState(store, { error });
              },
              finalize() {
                patchState(store, { loading: false });
              },
            })
          )
        )
      )
    ),
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
