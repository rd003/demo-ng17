import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [],
  template: ` <h2>Products</h2> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {}
