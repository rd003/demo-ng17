import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProductStore } from "./product.store";
import { CategoryStore } from "../category/category.store";
import { ProductListComponent } from "./product-list.component";
import { ProductFormComponent } from "./product-form.component";
import { Product } from "../shared/models/product";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent],
  template: `
    <h2>Products</h2>
    <app-product-form />
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

  onEdit(product: Product) {}

  OnDelete(product: Product) {}
}
