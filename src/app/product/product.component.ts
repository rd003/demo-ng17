import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProductStore } from "./product.store";
import { CategoryStore } from "../category/category.store";
import { ProductListComponent } from "./product-list.component";
import { ProductFormComponent } from "./product-form.component";
import { Product } from "../shared/models/product";
import { Category } from "../shared/models/category";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent],
  template: `
    <h2>Products</h2>
    <app-product-form
      [categories]="categoryStore.categories()"
      [product]="productToEdit"
      (submit)="onSubmit($event)"
      (reset)="onReset()"
    />
    <app-product-list
      [products]="productStore.products()"
      (edit)="onEdit($event)"
      (delete)="OnDelete($event)"
    />
  `,
  styles: [``],
  providers: [ProductStore, CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  productStore = inject(ProductStore);
  categoryStore = inject(CategoryStore);
  productToEdit: Product | null = null;
  onEdit(product: Product) {
    this.productToEdit = product;
  }

  OnDelete(product: Product) {}

  onSubmit(category: Category) {
    if (category.id.length > 0) {
      // add
    } else {
      //update
    }
  }

  onReset() {
    this.productToEdit = null;
  }
}
