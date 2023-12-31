import { HttpErrorResponse } from "@angular/common/http";
import { Product } from "../shared/models/product";
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withHooks,
} from "@ngrx/signals";
import { inject } from "@angular/core";
import { ProductService } from "../shared/data-access/product.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";

type Store = {
  products: Product[];
  loading: boolean;
  error: HttpErrorResponse | null;
};

const initialState: Store = {
  products: [],
  loading: false,
  error: null,
};

export const ProductStore = signalStore(
  withState(initialState),
  withMethods((store, productService = inject(ProductService)) => ({
    addProduct: rxMethod<Product>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((product) =>
          productService.add(product).pipe(
            tapResponse({
              next(savedProduct) {
                const updatedProducts = [...store.products(), savedProduct];
                patchState(store, { products: updatedProducts });
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
    updatePerson: rxMethod<Product>(
      pipe(
        tap(() => patchState(store, { loading: false })),
        switchMap((product) =>
          productService.update(product).pipe(
            tapResponse({
              next(value) {
                const updatedProducts = store
                  .products()
                  .map((p) => (p.id === product.id ? product : p));
                patchState(store, { products: updatedProducts });
              },
              error(error: HttpErrorResponse) {
                console.log(error);
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
    deleteProduct: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: false })),
        switchMap((id) =>
          productService.delete(id).pipe(
            tapResponse({
              next(value) {
                const updatedProducts = store
                  .products()
                  .filter((p) => p.id !== id);
                patchState(store, { products: updatedProducts });
              },
              error(error: HttpErrorResponse) {
                console.log(error);
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
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          productService.getAll().pipe(
            tapResponse({
              next(products) {
                patchState(store, { products });
              },
              error(error: HttpErrorResponse) {
                console.log(error);
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
