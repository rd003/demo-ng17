import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "todos",
    loadComponent: () =>
      import("../app/todos/todo.component").then((a) => a.TodoComponent),
  },
  {
    path: "giflist",
    loadComponent: () =>
      import("../app/giflist/giflist-main.component").then(
        (a) => a.GifListMainComponent
      ),
  },
  {
    path: "peoplerx",
    loadComponent: () =>
      import("../app/people-rx/people.rx.component").then(
        (a) => a.PeopleRxComponent
      ),
  },
  {
    path: "people-signal-store",
    loadComponent: () =>
      import("../app/people-signal-store/people-signal.component").then(
        (a) => a.PersonSignalStoreComponent
      ),
  },
  {
    path: "categories",
    loadComponent: () =>
      import("../app/category/category.component").then(
        (a) => a.CategoryComponent
      ),
  },
  {
    path: "",
    redirectTo: "/todos",
    pathMatch: "full",
  },
];
