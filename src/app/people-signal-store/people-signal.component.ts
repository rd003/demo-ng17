import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { JsonPipe, NgFor } from "@angular/common";
import { PersonStore } from "./people-store";
import { PersonModel } from "../shared/models/person.model";
import { generateGUID } from "../shared/utils/generateGUID";

@Component({
  selector: "app-component",
  standalone: true,
  imports: [NgFor, JsonPipe],
  template: `
    <h2>People (ngrx signal store demo)</h2>
    {{ this.store.loading() }}
    {{ this.store.error() }}
    {{ this.people | json }}
    <ul>
      <li *ngFor="let person of this.store.people()">
        {{ person.name }} | {{ person.email }}
      </li>
    </ul>

    <button (click)="add()">Add +</button>
  `,
  styles: [``],
  providers: [PersonStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeeopleSignalStoreComponent implements OnInit {
  readonly store = inject(PersonStore);
  people!: PersonModel[];

  add() {
    const person: PersonModel = {
      id: generateGUID(),
      name: "ravindra",
      email: "ravindra@gmail.com",
    };
    this.store.add(person);
  }

  ngOnInit() {
    this.people = this.store.people();
  }
}
