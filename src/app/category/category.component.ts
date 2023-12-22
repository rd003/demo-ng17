import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CategoryStore } from "./category.store";
import { CategoryListComponent } from "./ui/categoriy-list.component";
import { CategoryFormComponent } from "./ui/category-form.component";
import { Category } from "../shared/models/category";

@Component({
  selector: `app-category`,
  standalone: true,
  imports: [NgIf, CategoryListComponent, CategoryFormComponent],
  template: `
    <h2>Category</h2>
    <app-category-form (submit)="onSubmit($event)" />
    <app-category-list [categories]="categoryStore.categories()" />
  `,
  styles: [],
  providers: [CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  categoryStore = inject(CategoryStore);
  onSubmit(category: Category) {
    alert(JSON.stringify(category));
  }
}
