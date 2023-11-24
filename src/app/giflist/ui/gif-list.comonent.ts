import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { GifPlayerComponent } from "./gif-player.component";
import { WINDOW } from "../../shared/utils/injection-token";
import { Gif } from "../../shared/models";

@Component({
  standalone: true,
  selector: "app-gif-list",
  template: `
    @for (gif of gifs; track gif.permalink){
    <div>
      <app-gif-player
        [src]="gif.src"
        [thumbnail]="gif.thumbnail"
        data-testid="gif-list-item"
      ></app-gif-player>
      <span>{{ gif.title }}</span>
      <span class="toolbar-spacer"></span>
      <button
        mat-icon-button
        (click)="window.open('https://reddit.com/' + gif.permalink)"
      ></button>
    </div>
    } @empty {
    <p data-testid="no-gifs">Can't find any gifs 🤷</p>
    }
  `,
  imports: [CommonModule, GifPlayerComponent],
  styles: [
    `
      div {
        margin: 1rem;
        filter: drop-shadow(0px 0px 6px #0e0c1ba8);
      }

      p {
        font-size: 2em;
        width: 100%;
        text-align: center;
        margin-top: 4rem;
      }
    `,
  ],
})
export class GifListComponent {
  @Input({ required: true }) gifs!: Gif[];
  window = inject(WINDOW);
}
