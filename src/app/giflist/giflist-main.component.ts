import { Component, inject } from "@angular/core";
import { GifListComponent } from "./ui/gif-list.comonent";
import { RedditService } from "../shared/data-access/reddit.service";
import { SearchBarComponent } from "./ui/search-bar.component";

@Component({
  standalone: true,
  selector: "app-home",
  template: `
    <app-search-bar
      [subredditFormControl]="redditService.subredditFormControl"
    ></app-search-bar>

    @if (redditService.loading()){ loading....... } @else {
    <app-gif-list
      [gifs]="redditService.gifs()"
      infiniteScroll
      (scrolled)="redditService.pagination$.next(redditService.lastKnownGif())"
      class="grid-container"
    />
    }
  `,
  imports: [GifListComponent, SearchBarComponent],
  styles: [
    `
      mat-progress-spinner {
        margin: 2rem auto;
      }
    `,
  ],
})
export class GifListMainComponent {
  redditService = inject(RedditService);
}
