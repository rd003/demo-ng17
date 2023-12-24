import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CategoryStore } from "./category.store";
import { CategoryListComponent } from "./ui/categoriy-list.component";
import { CategoryFormComponent } from "./ui/category-form.component";
import { Category } from "../shared/models/category";
import { generateGUID } from "../shared/utils/generateGUID";

@Component({
  selector: `app-category`,
  standalone: true,
  imports: [NgIf, CategoryListComponent, CategoryFormComponent],
  template: `
    <h2>Category</h2>
    <app-category-form
      (submit)="onSubmit($event)"
      (reset)="onReset()"
      [formData]="categoryToEdit"
    />
    <app-category-list
      [categories]="categoryStore.categories()"
      (delete)="onDelete($event)"
      (edit)="onEdit($event)"
    />
  `,
  styles: [],
  providers: [CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  categoryStore = inject(CategoryStore);
  categoryToEdit!: Category | null;
  onSubmit(category: Category) {
    if (category.id.length < 1) {
      category.id = generateGUID();
      this.categoryStore.addCategory(category);
    } else {
      this.categoryStore.updateCategory(category);
    }
  }

  onEdit(category: Category) {
    this.categoryToEdit = category;
  }

  onReset() {
    this.categoryToEdit = null;
  }

  onDelete(category: Category) {
    if (window.confirm(`Are you sure to delete ${category.name}`)) {
      this.categoryStore.deleteCategory(category.id);
    }
  }
}
