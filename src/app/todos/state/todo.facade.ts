import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: HttpErrorResponse | null;
  action: string;
}

@Injectable()
export class TodoFacade {
  private todoService = inject(TodoService);
  private state = signal<TodoState>({
    todos: [],
    loading: false,
    error: null,
    action: "Add",
  });

  todos = computed(() => this.state().todos);
  // pendingTodos = this.todos().filter((a) => !a.completed);
  pendingTodos = computed(() => this.state().todos.filter((a) => !a.completed));
  completedTodos = computed(() =>
    this.state().todos.filter((a) => a.completed)
  );
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  action = computed(() => this.state().action);

  setLoading() {
    this.state.update((state) => ({
      ...state,
      loading: true,
    }));
  }

  setAction(action: string) {
    this.state.update((state) => ({
      ...state,
      action,
    }));
  }

  addTodo(todo: Todo) {
    this.setLoading();
    this.todoService.add(todo).subscribe({
      next: (data) => {
        this.state.update((state) => ({
          ...state,
          todos: [...state.todos, data],
          loading: false,
        }));
      },
      error: (error) => {
        this.state.update((state) => ({
          ...state,
          loading: false,
          error,
        }));
      },
    });
  }

  updateTodo(todo: Todo) {
    this.setLoading();
    this.todoService.update(todo).subscribe({
      next: () => {
        this.state.update((state) => ({
          ...state,
          todos: state.todos.map((a) => (a.id === todo.id ? todo : a)),
          loading: false,
        }));
      },
      error: (error) => {
        this.state.update((state) => ({
          ...state,
          loading: false,
          error,
        }));
      },
    });
  }

  getTodo(id: string) {
    return this.todos().filter((a) => a.id === id)[0];
  }

  deleteTodo(id: string) {
    this.setLoading();
    this.todoService.delete(id).subscribe({
      next: () => {
        this.state.update((state) => ({
          ...state,
          todos: state.todos.filter((a) => a.id != id),
          loading: false,
        }));
      },
      error: (error) => {
        this.state.update((state) => ({
          ...state,
          loading: false,
          error,
        }));
      },
    });
  }
  constructor() {
    this.setLoading();
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.state.update((state) => ({
          ...state,
          todos: data,
          loading: false,
        }));
      },
      error: (error) => ({
        ...this.state,
        error,
        loading: false,
      }),
    });
  }
}
