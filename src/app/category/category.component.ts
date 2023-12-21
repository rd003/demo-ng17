import { JsonPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CategoryStore } from "./category.store";

@Component({
  selector: `app-category`,
  standalone: true,
  imports: [NgIf, JsonPipe],
  template: `
    <h3>Category</h3>
    {{ categoryStore.categories() | json }}
  `,
  styles: [],
  providers: [CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  categoryStore = inject(CategoryStore);
}
