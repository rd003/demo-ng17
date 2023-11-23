import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <ul>
      <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
      <li><a routerLink="/todos" routerLinkActive="active">Todos</a></li>
    </ul>
    <div style="padding:8px 10px !important;">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      ul {
        padding: 15px 5px;
        // background-color: whitesmoke;
      }
      li {
        list-style: none;
        display: inline;
        padding: 10px;
      }
      li a {
        text-decoration: none;
        color: black;
        cursor: pointer;
      }
      .active {
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent {}
