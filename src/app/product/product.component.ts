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

  OnDelete(product: Product) {
    if (window.confirm(`Are you sure to delete ${product.name}`)) {
      this.productStore.deleteProduct(product.id);
    }
  }

  onSubmit(product: Product) {
    if (product.id.length < 1) {
      this.productStore.addProduct(product);
    } else {
      this.productStore.updatePerson(product);
    }
  }

  onReset() {
    this.productToEdit = null;
  }
}
