import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "app-search-bar",
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" class="searchBox" [formControl]="subredditFormControl" />
  `,
  styles: [
    `
      .searchBox {
        font-size: 16px;
        padding: 10px;
        width: 400px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input({ required: true }) subredditFormControl!: FormControl;
}
