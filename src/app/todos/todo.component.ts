import { Component, inject } from "@angular/core";
import { TodoFacade } from "./state/todo.facade";

@Component({
  selector: "app-todo",
  standalone: true,
  template: `
    <h1>Todo App</h1>
    <ul>
      @for (todo of todos(); track $index) {
      <li><input type="checkbox" /> {{ todo.title }} | {{ todo.completed }}</li>
      }
    </ul>
  `,
  styles: `
  `,
  providers: [TodoFacade],
})
export class TodoComponent {
  todoFacade = inject(TodoFacade);

  todos = this.todoFacade.todos;
}
