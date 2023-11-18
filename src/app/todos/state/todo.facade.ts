import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

@Injectable()
export class TodoFacade {
  private todoService = inject(TodoService);
  private state = signal<TodoState>({
    todos: [],
    loading: false,
    error: null,
  });

  todos = computed(() => this.state().todos);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor() {
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
