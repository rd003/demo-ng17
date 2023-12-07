import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { PeopleSignalFacade } from "./people-signal-facade";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-component",
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>People (ngrx signal store demo)</h2>
    <ul>
      <li *ngFor="let person of people">{{ person.name }}</li>
    </ul>
  `,
  styles: [``],
  providers: [PeopleSignalFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeeopleSignalStore {
  peopleFacade = inject(PeopleSignalFacade);

  people = this.peopleFacade.people();
}
