import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { NgFor } from "@angular/common";
import { PersonStore } from "./people-store";
import { PersonModel } from "../shared/models/person.model";
import { generateGUID } from "../shared/utils/generateGUID";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-component",
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  template: `
    <h2>People (ngrx signal store demo)</h2>

    <ng-container *ngIf="this.store.loading()"> Loading..... </ng-container>

    <form [formGroup]="personForm" (ngSubmit)="add()">
      <input type="hidden" formControlName="id" />
      Name: <input type="text" formControlName="name" />
      <br />
      Email: <input type="email" formControlName="email" />
      <br />
      <button type="submit" [disabled]="personForm.invalid">Save</button>
      <button type="button" (click)="this.personForm.reset()">Reset</button>
    </form>

    {{ this.store.error() }}

    <ul>
      <li *ngFor="let person of this.store.people()">
        {{ person.name }} | {{ person.email }} |
        <span style="cursor:pointer" (click)="edit(person)">✏️</span> |
        <span style="cursor:pointer" (click)="delete(person)">❌</span>
      </li>
    </ul>
  `,
  styles: [``],
  providers: [PersonStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonSignalStoreComponent implements OnInit {
  readonly store = inject(PersonStore);
  readonly fb = inject(FormBuilder);

  personForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    email: ["", Validators.required],
  });

  add() {
    const person: PersonModel = Object.assign(this.personForm.value);
    if (person.id.length > 0) {
      this.store.updatePerson(person);
    } else {
      person.id = generateGUID();
      this.store.addPerson(person);
    }
    this.personForm.reset();
  }

  edit(person: PersonModel) {
    this.personForm.patchValue(person);
  }

  delete(person: PersonModel) {
    if (
      window.confirm(
        `Are you sure to delete (${person.name} | ${person.email})`
      )
    ) {
      this.store.deletPerson(person.id);
    }
  }
  ngOnInit() {}
}
