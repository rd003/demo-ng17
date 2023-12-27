import { NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Category } from "../shared/models/category";
import { Product } from "../shared/models/product";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
  ],
  template: `
    <form
      [formGroup]="productForm"
      (ngSubmit)="onSubmit($event)"
      style="display: flex;gap:10px"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Select me</mat-label>
        <mat-select formControlName="category_id">
          <mat-option
            [value]="category.id"
            *ngFor="let category of categories"
            >{{ category.name }}</mat-option
          >
        </mat-select>
      </mat-form-field>

      <button type="submit" mat-raised-button color="primary">Save</button>
      <button
        type="button"
        (click)="onReset()"
        mat-raised-button
        color="secondary"
      >
        Reset
      </button>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  @Input({ required: true }) categories!: Category[];
  @Output() submit = new EventEmitter<Category>();
  @Output() reset = new EventEmitter();
  @Input() set product(product: Product | null) {
    if (product) this.productForm.patchValue(product);
  }
  fb = inject(FormBuilder);
  productForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    category_id: ["", Validators.required],
  });

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submit.emit(Object.assign(this.productForm.value));
    this.productForm.reset();
  }

  onReset() {
    this.productForm.reset();
    this.reset.emit();
  }
}
