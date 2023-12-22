import { HttpErrorResponse } from "@angular/common/http";
import { Category } from "../shared/models/category";
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { inject } from "@angular/core";
import { CategoryService } from "../shared/data-access/category.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";

type State = {
  categories: Category[];
  loading: boolean;
  error: HttpErrorResponse | null;
};

const initialState: State = {
  categories: [],
  loading: false,
  error: null,
};

export const CategoryStore = signalStore(
  withState(initialState),
  withMethods((store, categoryService = inject(CategoryService)) => ({
    loadPeople: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap(() => {
          return categoryService.getAll().pipe(
            tapResponse({
              next: (categories) => {
                patchState(store, { categories });
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
    addCategory: rxMethod<Category>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((category) =>
          categoryService.add(category).pipe(
            tapResponse({
              next(categoryResponse) {
                patchState(store, {
                  categories: [...store.categories(), categoryResponse],
                });
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
  })),

  withHooks({
    onInit({ loadPeople }) {
      loadPeople();
    },
  })
);
