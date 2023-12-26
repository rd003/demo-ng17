import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule],
  template: ` <form></form> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  fb = inject(FormBuilder);
  productForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    category_id: ["", Validators.required],
  });
}
