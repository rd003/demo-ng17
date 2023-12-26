import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Product } from "../shared/models/product";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <table mat-table [dataSource]="products" class="mat-elavation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let product">{{ product.name }}</td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Caegory</th>
        <td mat-cell *matCellDef="let product">{{ product.category_id }}</td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let product">
          <button
            mat-raised-button
            color="primary"
            (click)="edit.emit(product)"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-raised-button color="warn" (click)="edit.emit(product)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products!: Product[];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  displayedColumns = ["name", "category", "action"];
}
