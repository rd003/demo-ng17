import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { TodoComponent } from "./todos/todo.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoComponent],
  template: `<app-todo />`,
  styles: [],
})
export class AppComponent {}
