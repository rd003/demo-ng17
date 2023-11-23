import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "todos",
    loadComponent: () =>
      import("../app/todos/todo.component").then((a) => a.TodoComponent),
  },
  {
    path: "",
    redirectTo: "/todos",
    pathMatch: "full",
  },
];
