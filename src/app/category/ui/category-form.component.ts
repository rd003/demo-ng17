import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
  EventEmitter,
} from "@angular/core";
import { Category } from "../../shared/models/category";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-category-form",
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, NgIf],
  template: `
    <form [formGroup]="categoryForm" (ngSubmit)="onSumbit($event)">
      <input type="hidden" formControlName="id" />
      <div style="display:flex;gap:10px">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <ng-container
          *ngIf="f['name'].invalid && (f['name'].dirty || f['name'].touched)"
        >
          <div *ngIf="f['name'].errors?.['required']" class="text-danger">
            Name is required
          </div>
        </ng-container>
        <button
          type="submit"
          mat-raised-button
          color="primary"
          [disabled]="categoryForm.invalid"
        >
          Save
        </button>
        <button
          type="button"
          mat-raised-button
          color="accent"
          (click)="onReset()"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent {
  @Output() submit = new EventEmitter<Category>();
  fb = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
  });

  get f() {
    return this.categoryForm.controls;
  }

  onSumbit(event: Event) {
    event.stopPropagation();
    const category: Category = Object.assign(this.categoryForm.value);
    this.submit.emit(category);
    this.categoryForm.reset();
  }

  onReset() {
    this.categoryForm.reset();
  }
}
