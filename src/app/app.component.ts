import { Component, effect, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { RedditService } from "./shared/data-access/reddit.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <ul>
      <li><a routerLink="todos" routerLinkActive="active">Home</a></li>
      <li><a routerLink="todos" routerLinkActive="active">Todos</a></li>
      <li><a routerLink="giflist" routerLinkActive="active">Gif-List</a></li>
      <li><a routerLink="peoplerx" routerLinkActive="active">Rx-Angular</a></li>
      <li>
        <a routerLink="people-signal-store" routerLinkActive="active"
          >Signal Store</a
        >
      </li>
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
export class AppComponent {
  redditService = inject(RedditService);

  constructor() {
    effect(() => {
      const error = this.redditService.error();
      if (error != null) {
        //window.alert(error);
      }
    });
  }
}
