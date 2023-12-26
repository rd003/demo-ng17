import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProductStore } from "./product.store";
import { CategoryStore } from "../category/category.store";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [JsonPipe],
  template: `
    <h2>Products</h2>
    {{ productStore.products() | json }}
  `,
  styles: [``],
  providers: [ProductStore, CategoryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  productStore = inject(ProductStore);
  categoryStore = inject(CategoryStore);
}
