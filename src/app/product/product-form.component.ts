import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>product-form works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {}
