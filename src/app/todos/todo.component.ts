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
    <h1>Todo App with signal</h1>
    @if(todoFacade.loading()) {Loading.... }
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
          {{ this.todoFacade.action() }}
        </button>
      </form>
    </div>
    <ul>
      @for (todo of pendingTodos(); track $index) {
      <li style="list-style: none;font-size:18px">
        <input type="checkbox" (click)="togglComplete(todo.id)" />
        <span [class.complete]="todo.completed">
          {{ todo.title }}
        </span>
        |
        <button (click)="edit(todo)">✏️</button>
        |
        <button (click)="delete(todo.id)">❌</button>
      </li>
      } @empty {
      <span>No items</span>
      }
    </ul>
    <h3>Completed</h3>
    <ul>
      @for (todo of completedTodos(); track $index) {
      <li style="list-style: none;font-size:18px">
        <input type="checkbox" (click)="togglComplete(todo.id)" />
        <span [class.complete]="todo.completed">
          {{ todo.title }}
        </span>
        |
        <button (click)="edit(todo)">✏️</button>
        |
        <button (click)="delete(todo.id)">❌</button>
      </li>
      } @empty {
      <span>No items</span>
      }
    </ul>
  `,
  styles: `
  .complete{
    text-decoration:line-through;
  }
  `,
  providers: [TodoFacade],
})
export class TodoComponent {
  todoFacade = inject(TodoFacade);
  fb = inject(FormBuilder);
  pendingTodos = this.todoFacade.pendingTodos;
  completedTodos = this.todoFacade.completedTodos;
  todoForm = this.fb.group({
    id: [""],
    title: ["", Validators.required],
  });

  onSubmit() {
    if (this.todoForm.get("id")?.value) {
      const todoToUpdate = Object.assign(this.todoForm.value);
      this.todoFacade.updateTodo(todoToUpdate);
    } else {
      const todo: Todo = {
        id: generateGUID(),
        title: this.todoForm.get("title")?.value ?? "",
        completed: false,
      };
      this.todoFacade.addTodo(todo);
    }
    this.todoFacade.setAction("Add");
    this.todoForm.reset();
  }

  togglComplete(id: string) {
    const todo = this.todoFacade.getTodo(id);
    todo.completed = !todo.completed;
    this.todoFacade.updateTodo(todo);
  }

  edit(todo: Todo) {
    this.todoFacade.setAction("Update");
    this.todoForm.patchValue(todo);
  }

  delete(id: string) {
    if (window.confirm("Are you sure??")) {
      this.todoFacade.deleteTodo(id);
    }
  }
}
