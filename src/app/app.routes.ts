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
    path: "",
    redirectTo: "/todos",
    pathMatch: "full",
  },
];
