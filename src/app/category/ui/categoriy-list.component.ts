import { NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Category } from "../../shared/models/category";

@Component({
  selector: `app-category-list`,
  imports: [
    NgFor,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
  ],
  template: `
    <table mat-table [dataSource]="categories" class="mat-elavation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let category">{{ category.name }}</td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let category">
          <button
            mat-raised-button
            color="primary"
            (click)="edit.emit(category)"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button
            mat-raised-button
            color="warn"
            (click)="delete.emit(category)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input({ required: true }) categories!: Category[];
  @Output() edit = new EventEmitter<Category>();
  @Output() delete = new EventEmitter<Category>();
  displayedColumns = ["name", "action"];
}
