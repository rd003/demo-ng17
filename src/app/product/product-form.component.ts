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
      <div style="display: flex;flex-direction:column">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        @if((f["name"].dirty || f["name"].touched)&& f["name"].invalid) {
        @if(f["name"].errors?.["required"]){
        <span style="color:red">Name is required</span>
        } }
      </div>
      <div style="display: flex;flex-direction:column">
        <mat-form-field>
          <mat-label>Select category</mat-label>
          <mat-select formControlName="category_id">
            <mat-option
              [value]="category.id"
              *ngFor="let category of categories"
              >{{ category.name }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        @if((f["category_id"].dirty || f["category_id"].touched)&&
        f["category_id"].invalid) { @if(f["category_id"].errors?.["required"]){
        <span style="color:red">category is required</span>
        } }
      </div>
      <button
        type="submit"
        [disabled]="productForm.invalid"
        mat-raised-button
        color="primary"
      >
        Save
      </button>
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
  @Output() submit = new EventEmitter<Product>();
  @Output() reset = new EventEmitter();
  @Input() set product(product: Product | null) {
    if (product) this.productForm.patchValue(product);
  }
  get f() {
    return this.productForm.controls;
  }
  fb = inject(FormBuilder);
  productForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    category_id: ["", Validators.required],
  });

  onSubmit(event: Event) {
    event.stopPropagation();
    const product: Product = Object.assign(this.productForm.value);
    this.submit.emit(product);
    this.productForm.reset();
  }

  onReset() {
    this.productForm.reset();
    this.reset.emit();
  }
}
