import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoFacade } from "./state/todo.facade";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Todo } from "./todo.model";
import { generateGUID } from "../shared/utils/generateGUID";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Todo App</h1>
    <div style="margin-bottom:5px;">
      <form
        [formGroup]="todoForm"
        (ngSubmit)="onSubmit()"
        style="width: 100%;display:flex;gap:8px"
      >
        <input type="hidden" formControlName="id" />
        <input
          type="text"
          formControlName="title"
          style="width:50%;font-size:18px;padding:6px 5px;border-radius:5px"
        />
        <button
          type="submit"
          style="font-size:18px;padding:6px 5px;border-radius:5px;cursor:pointer"
          [disabled]="todoForm.invalid"
        >
          Add
        </button>
      </form>
    </div>
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
  fb = inject(FormBuilder);
  todos = this.todoFacade.todos;
  todoForm = this.fb.group({
    id: [""],
    title: ["", Validators.required],
  });

  onSubmit() {
    const todo: Todo = {
      id: generateGUID(),
      title: this.todoForm.get("title")?.value ?? "",
      completed: false,
    };
    this.todoFacade.addTodo(todo);
    this.todoForm.reset();
  }
}
