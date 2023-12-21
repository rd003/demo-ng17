import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CategoryStore } from "./category.store";
import { CategoryListComponent } from "./ui/categoriy-list.component";

@Component({
  selector: `app-category`,
  standalone: true,
  imports: [NgIf, CategoryListComponent],
  template: `
    <h2>Category</h2>

    <app-category-list [categories]="categoryStore.categories()" />
  `,
  styles: [],
  providers: [CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  categoryStore = inject(CategoryStore);
}
